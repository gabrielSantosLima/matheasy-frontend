const user = {
  id: null,
  name: "",
  avatar: null
};

const destinatary = {
  id: null,
  name: "",
  avatar: null
};

async function loginUser(){
  try{
    
    const response = await api('/loggedUsername');
    const data = await response.text();

    if(data){
      console.log(data);
    }

  }catch(error){
    console.log(error)
  }
}

const Chat = {
  
  //conecta ao chat 
  connect: () =>{

    console.log("Conectou!");
  },

  //Carrega mensagens iniciais
  loadMessages: () => {
    console.log("Carregando mensagens");
  },

  //envia uma mensagem
  sendMessage: (message) => {
  } 
}

const ChatDOM = {

  //Adiciona mensagem ao chat
  sendMessage: (message) => {
    
  }
}

function init(){
  loginUser();
  
  Chat.connect();
  Chat.loadMessages();
}

init();