// function login() {
//     // Form fields, see IDs above
//     var params = {
//         email: document.querySelector('#inputEmail').value
//     }
//     var xhr = new XMLHttpRequest()
//     var url = 'http://localhost:8000/creatder/register_request/'
//     xhr.open('POST', url, true)
//     xhr.setRequestHeader('Content-type', 'application/json')
//     xhr.addEventListener('progress', function() {
//         console.log(this.status)
//     })
//
//     xhr.send(JSON.stringify(params)) // Make sure to stringify
// }

document.getElementById("register-btn").addEventListener("click", function(e){
  var params = {
      email: document.getElementById('inputEmail').value
  };
  var url = 'http://localhost:8000/creatder/register_request/'
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201) {
          alert('Mail has been sent. Check your mailbox');
          var element = document.getElementById('form-signin');
          console.log(xhr.responseText)
        }
        else if (xhr.readyState == 4 && xhr.status == 400) {
            var parsed = JSON.parse(xhr.responseText);
            alert(parsed.non_field_errors[0])
        }
  }
  xhr.send(JSON.stringify(params))
  e.preventDefault()
});
