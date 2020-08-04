document.querySelector('#form').addEventListener('submit', event => {
  event.preventDefault();
  
  const message = event.target[0].value;

  console.log(message)
});