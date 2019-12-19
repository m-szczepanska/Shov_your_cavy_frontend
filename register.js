
document.querySelector('#formAjax').addEventListener("submit", function(e){
  e.preventDefault();

  var xhr = new XMLHttpRequest()

  var query_token = window.location.search
  var token = query_token.slice(7)
  var url = `http://localhost:8000/creatder/register/${token}/`
  var params = {
      name: document.querySelector('#inputName').value,
      login: document.querySelector('#inputLogin').value,
      email: document.querySelector('#inputEmail').value,
      password: document.querySelector('#inputPassword').value,
      password_repeat: document.querySelector('#inputPasswordRepeat').value
  };

  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201) {
          alert('You can log in now');
          console.log(xhr.responseText)
          window.location.href = "file://login.html"
      }
  }
  xhr.send(JSON.stringify(params))

});
