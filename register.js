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

// window.onload = function loadDoc() {
//
//     var query_token = window.location.search
//     var token = query_token.slice(7)
//
//     console.log(xhttp)
// };


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
          window.location.href = "file:///Users/marsza/workspace/zwierzu_front/login.html"
      }
  }
  xhr.send(JSON.stringify(params))

});



//
// document.getElementById("demo").innerHTML = "Hello World";
//     http.onreadystatechange = function() {//Call a function when the state changes.
//         if(http.readyState == 4 && http.status == 200) {
//             alert('mail sent');
//         }
//     }

// var http = new XMLHttpRequest();
// var url = 'get_data.php';
// var params = 'orem=ipsum&name=binny';
// http.open('POST', url, true);
//
// //Send the proper header information along with the request
// http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//
// http.onreadystatechange = function() {//Call a function when the state changes.
//     if(http.readyState == 4 && http.status == 200) {
//         alert(http.responseText);
//     }
// }
// http.send(params);

// function console() {
//     // Form fields, see IDs above
//     var params = {
//         email: document.querySelector('#inputEmail').value
//     }
//     console.log(params)
// }
