
// CLASSIFICAÇÃO

document.addEventListener('DOMContentLoaded', function(){
  let rates = document.querySelectorAll('.rate');
  rates.forEach(function(rate){
      rate.addEventListener('click', setRating); 
  });
  
  let rating = parseInt(document.querySelector('.rates').getAttribute('data-rating'));
  let target = rates[rating - 1];
  target.dispatchEvent(new MouseEvent('click'));
});

function setRating(ev){
  let span = ev.currentTarget;
  let rates = document.querySelectorAll('.rate');
  let match = false;
  let num = 0;
  rates.forEach(function(rate, index){
      if(match){
          rate.classList.remove('rated');
      }else{
          rate.classList.add('rated');
      }
      //Altera a quantidade de estrelas mesmo já clicado
      if(rate === span){
          match = true;
          num = index + 1;
      }
  });
  document.querySelector('.rates').setAttribute('data-rating', num);
}