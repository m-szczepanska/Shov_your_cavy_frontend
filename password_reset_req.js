document.getElementById("submit-btn").addEventListener("click", function(e){
  var params = {
      email: document.getElementById('inputEmail').value
  };
  var url = 'http://127.0.0.1:8000/creatder/password_reset_request/'
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201) {
          alert('Mail has been sent. Check your mailbox');
          console.log(xhr.responseText)
        }
        else if (xhr.readyState == 4 && xhr.status == 400) {
            var parsed = JSON.parse(xhr.responseText);
            alert(parsed.non_field_errors[0])
        }
        else {
          console.log(xhr.readyState)}
  }
  xhr.send(JSON.stringify(params))
  e.preventDefault()
});
