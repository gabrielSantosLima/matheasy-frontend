
    
    $(document).ready(()=>{
      
      $('#select').on('change', showTextArea);
      
      $('input').on('blur', isValid);
      
      $('input[type=email]').on('blur', event => {
        const value = event.target.value;
        
        fetch(`http://apilayer.net/api/check?access_key=a289aca49ea3e868952a864195afc1f9&email=${value}&smtp=1&format=1`)
        .then(resp => {
          return resp.json()
        })
        .then(data => {
          const isValid = data.smtp_check;
          
          console.log(isValid)
          
          setInvalidField(!isValid, $('input[type=email]'));
        })
      });
      
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
    
    function showTextArea(event){
      const tipo = event.target.value;
      
      if(tipo === 'professor'){
        $('#area-professor').removeClass('d-none');
        return;
      }
      
      $('#area-professor').addClass('d-none');  
      return;
    }