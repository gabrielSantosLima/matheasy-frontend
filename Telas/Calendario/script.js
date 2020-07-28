let calendar;
let calendarList;
let idToUpdate;

const setCalendar = (events = []) => {
  const calendarEl = document.querySelector('#calendar');
  const calendarElList = document.querySelector('#calendar-list');
  
  const optionsDayGrid = {
    plugins: [ 'dayGrid', 'interaction' ],
    dateClick: openContainerForm,
    buttonText: {
      today: 'Hoje'
    },
    eventClick: openCardToUpdate,
    contentHeight: 500,
    weekends: true,
    selectable: true,
    events: events
  }
  
  calendar = createObjectCalendar(calendarEl, optionsDayGrid);
  
  const optionsList = {
    plugins: [ 'list', 'interaction' ],
    dateClick: openContainerForm,
    buttonText: {
      today: 'Hoje',
      noEventsToDisplay: 'Bora'
    },
    eventClick: openCardToUpdate,
    contentHeight: 500,
    defaultView: 'listWeek',
    weekends: true,
    selectable: true,
    events: events
  }
  
  calendarList = createObjectCalendar(calendarElList, optionsList);
  
  $('.fc-list-empty')[0]["innerText"] = "Sem Eventos Cadastrados!";
}

const openContainerForm = (info) => {
  const { dateStr } = info;
  
  $('#title').val("Evento")
  $('#start').val(dateStr)
  $('#end').val(dateStr)
  
  $('#container-form').toggleClass('modificar-evento');
}

const openCardToUpdate = (info) => {
  const { id } = info.event;
  const { title, start, end } = calendar.getEventById(id);
  
  const startIsoDate = formattedDate(start.toISOString().substring(0,10));
  const endIsoDate = formattedDate(end ? end.toISOString().substring(0,10) : startIsoDate);
  
  idToUpdate = id;
  
  $('#title-event').text(title)
  $('#start-event').text(`Dia de início: ${startIsoDate}`)
  $('#end-event').text(`Dia de finalização: ${endIsoDate}`)

  $('#card-update').toggleClass('card-update');

  function formattedDate(date){
    return date.toLocaleString();
  }
}

const createObjectCalendar = (element, options) => {
  const calendar = new FullCalendar.Calendar(element, options);
  
  calendar.setOption('locale', 'pt-br');
  calendar.render();
  
  return calendar;
}

const closeContainer = (idContainer,className) => {
  $(`#${idContainer}`).toggleClass(className);
}

const addEvent = (data) => {
  calendar.addEvent(data);
  calendarList.addEvent(data);
}

const updateEvent = (data) => {
  const events = calendar.getEvents().map(item => {
    if(item.id !== data.id){
      deleteEvent(item);
    }
  });
  
  addEvent(data);
  
  console.log(events);
}

const deleteEvent = (id) => {
  const event = calendar.getEventById(id);
  
  event.remove();
}

const listEvents = () => {
  
}

//Evento formulário
$('#form').on('submit', (event) => {
  event.preventDefault();
  
  const title = $('#title').val()
  const start = $('#start').val()
  const end = $('#end').val()
  const id = Math.random()
  .toString(36)
  .substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  const data = {
    id,
    title,
    start,
    end
  }
  
  addEvent(data);
  
  console.log(`[form-submit] Evento de id ${id} foi gerado!`);
  
  closeContainer('container-form','modificar-evento');
})

//fechar container modificar-evento
$('#close-button').on('click', (event) => {
  closeContainer('container-form','modificar-evento')
});

//fechar container card-update
$('#close-card-button').on('click', (event) => {
  closeContainer('card-update','card-update')
});

//deletar evento
$('#delete-button').on('click', (event) => {
  const isDelete = confirm('Você realmente deseja excluir este evento?');
  
  if(isDelete){
    deleteEvent(idToUpdate);
  }
  
  closeContainer('card-update', 'card-update')
});

//atualizar evento
$('#update-button').on('click', (event) => {
  const title = $('#upd-title').val();
  const start = $('#upd-start').val();
  const end = $('#upd-end').val();
  const id = idToUpdate;

  const data = {
    id,
    title,
    start,
    end
  }

  updateEvent(data)
  
  closeContainer('card-update', 'card-update')
});

//Monta o calendário inicial
$(document).on('DOMContentLoaded', () => {
  setCalendar(
    [
      {
        id: 1,
        title: 'Evento qualquer',
        start: Date.now()
      }
    ]);
});