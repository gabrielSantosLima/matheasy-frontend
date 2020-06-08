let calendar;
let calendarList;

const openContainerForm = (info) => {
  const start = info.date;
  
  console.log(start);
  
  $('.hidden').toggleClass('cadastrar-evento');
}

const closeContainerForm = () => {
  $('.hidden').toggleClass('cadastrar-evento');
}

const createObjectCalendar = (element, options) => {
  const calendar = new FullCalendar.Calendar(element, options);
  
  calendar.setOption('locale', 'pt-br');
  calendar.render();
  
  return calendar;
}

const openDescription = (id) => {

}

$(document).on('DOMContentLoaded', () => {
  const calendarEl = document.querySelector('#calendar');
  const calendarElList = document.querySelector('#calendar-list');
  
  calendar = createObjectCalendar(calendarEl, {
    plugins: [ 'dayGrid', 'interaction' ],
    dateClick: openContainerForm,
    buttonText: {
      today: 'Hoje'
    },
    weekends: true,
    selectable: true,
    events: []
  });
  
  calendar = createObjectCalendar(calendarElList, {
    plugins: [ 'list', 'interaction' ],
    dateClick: openContainerForm,
    buttonText: {
      today: 'Hoje'
    },
    defaultView: 'listWeek',
    weekends: true,
    selectable: true,
    events: []
  });
  
});

$('#form').on('submit', (event) => {
  event.preventDefault();
  
  const title = $('#title').val()
  const start = $('#start').val()
  const end = $('#end').val()
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  calendar.addEvent({
    id,
    title,
    start,
    end
  });
  
  console.log(`[form-submit] Evento de id ${id} foi gerado!`);
  
  closeContainerForm();
})