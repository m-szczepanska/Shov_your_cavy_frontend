// <input id="loginEmail" type="text" name="email" placeholder="Email">
// <input id="loginPassword" type="password" name="password" placeholder="Password">
//
// // return stops normal action and runs login()
// <button onclick="return login()">Submit</button>
//
// function login() {
//     // Form fields, see IDs above
//     const params = {
//         email: document.querySelector('#inputEmail').value
//     }
//     const http = new XMLHttpRequest()
//     http.open('POST', 'http://localhost:8000/creatder/register_request/')
//     http.setRequestHeader('Content-type', 'application/json')
//     http.send(JSON.stringify(params)) // Make sure to stringify
//     http.onload = function() {
//         // Do whatever with response
//         console.log(http.responseText)
//         <input type="reset" value="reset">
//     }
// }


function store_token_helper_and_redirect(response) {
    console.log(response);
    if (typeof(Storage) !== "undefined") {
      var user_id_value = JSON.parse(response.response).user_id
      var token_value = JSON.parse(response.response).uuid

      localStorage.setItem("token", token_value);
      localStorage.setItem("user_id", user_id_value);
      window.location.href = "home.html"
    } else {
      console.log("bad browser no storage")
    }
};

// function set_headers(response) {
//     // headers['Authorization'] = storage.token; <- pseudocode
//     var user_id = localStorage.getItem("user_id");
//     var token = localStorage.getItem("token");
//     response.setRequestHeader("Authorization", token);
//     response.setRequestHeader("user_id", user_id);
// };

document.getElementById("login-btn").addEventListener("click", function(e){
  var params = {
      login: document.getElementById('inputLogin').value,
      password: document.getElementById('inputPassword').value
  };
  var url = 'http://localhost:8000/creatder/login/'
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201) {
          console.log(xhr)
          alert('You are now logged in.');
          store_token_helper_and_redirect(xhr);
        }
        else {
          console.log(xhr.readyState)}
  }
  xhr.send(JSON.stringify(params))
  e.preventDefault()
});
