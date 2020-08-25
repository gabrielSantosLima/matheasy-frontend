const userId = $(document.body).data('id') 
let contatoId;
const from = $(document.body).data('name') 
const sock = new SockJS('http://localhost:8080/chat')
const stompClient = Stomp.over(sock);

console.log(sock)

const Chat = {
  //Conecta ao chat 
  connect: () =>{
    stompClient.connect({}, frame => {  
    }, error => console.log(error))
    
    console.log(`[chat] Usuário ${userId} Conectou!`);
  },
  
  //Carrega mensagens iniciais
  loadMessages: () => {
    console.log("[chat] Carregando mensagens");
    console.log("[chat] Mensagens carregadas");
  },
  
  //envia uma mensagem
  sendMessage: event => {
    event.preventDefault();
    const content = $('#input').val();

    if(!content){
      return;
    }

    const message = {
      from,
      content,
      userId
    }

    stompClient.send(
      `/app/chat/${contatoId}`,
      {}, 
      JSON.stringify(message)
    );

    $('#input').val('')
    addMessage(message)
  },

  //Reseta mensagens do chat
  reset: () =>{
    $('.chat').html('')
  }
}
// Message -> from , time, content, to

function addMessage(message){
  const messageDOM = `
  <div class="my-message">
  <img src="http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Download.png" alt="User" class="logo">
  <strong>${message.from}</strong>
  <p>${message.content}</p>
  </div>
  `
  $('.chat').append(messageDOM);
  endScrollChat();
}

function receiveMessage(message){
  const messageDOM = `
  <div class="other-message">
  <img src="http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Download.png" alt="User" class="logo">
  <strong>${message.from}</strong>
  <p>${message.content}</p>
  </div>
  `
  $('.chat').append(messageDOM);
  endScrollChat();
}

async function loadMessages(){
  const resp = await fetch(`http://localhost:8080/chat/${userId}/${contatoId}`)
  const messages = await resp.json();

  messages.map(message => {
    if(message.userId === userId){
      receiveMessage(message)
    }else{
      addMessage(message)
    }
  })
}

function userSelect(event){
  const contato = $(this) 
  
  //Altera cor de contato
  $('.contato').removeClass('select')
  contato.addClass('select')

  contatoId = contato.data('contatoId');

  showContato();
}

function showContato(){
  //Quando clicado, faz aparecer o chat com as mensagens
  $('#form').removeClass('hide')
  $('.chat').removeClass('hide')
  
  //Carrega as mensagens
  Chat.reset(); //Por enquanto enquanto n carrega mensagens do banco
  
  subscribe(`/queue/public/${userId}/${contatoId}`);
  loadMessages();
}

function subscribe(channel){
  stompClient.subscribe(channel, resp => {
    const message = JSON.parse(resp.body)
  
    if(message.userId === userId){
      return;
    }
  
    receiveMessage(message);
  
  });
}

function addEvents(){
  $('#form').submit(Chat.sendMessage)
  $('.contato').on('click', userSelect)
  $(document).ready(Chat.connect)
}

function endScrollChat(){
  const totalHeight = $('.chat')[0].scrollHeight
  $('.chat').scrollTop(totalHeight)
}

function init(){
  addEvents()
}

init();