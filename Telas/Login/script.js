

$(document).ready(()=>{
  
  $('input').on('blur', isValid);
});


function isValid(event){
  const target = event.target
  const content = target.value;
  
  setInvalidField(!content, target);
}

function setInvalidField(condition, target){
  
  if(condition){
    $(target).addClass('is-invalid');
    return;
  }
  
  $(target).removeClass('is-invalid');
  
}