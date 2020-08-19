const userId = $(document.body).data('id') 
const from = $(document.body).data('name') 
const sock = new SockJS('http://localhost:8080/chat')
const stompClient = Stomp.over(sock);
const Chat = {
  
  //conecta ao chat 
  connect: () =>{
    
    stompClient.connect({}, frame => {
      console.log(sock)
      
      stompClient.subscribe('/queue/public', resp => {
        const message = JSON.parse(resp.body)

        if(message.userId === userId){
          return;
        }

        receiveMessage(message);

      });
    
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

    const message = {
      from,
      content,
      userId
    }

    const resp = stompClient.send('/app/chat',{}, JSON.stringify(message));

    $('#input').val('')
    addMessage(message)
  } 
}
// Message -> from , time, content, to

function addMessage(message){
  const messageDOM = `
  <div class="my-message">
  <img src="./../../assets/imagem-teste.jpg" alt="User" class="logo">
  <strong>${message.from}</strong>
  <p>${message.content}</p>
  </div>
  `
  $('.chat').append(messageDOM);
}

function receiveMessage(message){
  const messageDOM = `
  <div class="other-message">
  <img src="./../../assets/imagem-teste.jpg" alt="User" class="logo">
  <strong>${message.from}</strong>
  <p>${message.content}</p>
  </div>
  `
  $('.chat').append(messageDOM);
}

function addEvents(){
  $('#form').submit(Chat.sendMessage)
  $(document).ready(Chat.connect)
  $(document).ready(Chat.loadMessages)
}

function init(){
  addEvents()
}

init();