
document.querySelector('#formAjax').addEventListener("submit", function(e){
  e.preventDefault();

  var xhr = new XMLHttpRequest()

  var query_token = window.location.search
  var token = query_token.slice(7)
  var url = `http://localhost:8000/creatder/password_reset/${token}/`
  var params = {
      password: document.querySelector('#inputPassword').value,
      password_repeat: document.querySelector('#inputPasswordRepeat').value
  };

  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201) {
          alert('You can log in now');
          window.location.href = "login.html"
      }
      else if (xhr.readyState == 4 && xhr.status == 400) {
          var parsed = JSON.parse(xhr.responseText);
          alert(parsed.non_field_errors[0])
      }
  }
  xhr.send(JSON.stringify(params))

});
