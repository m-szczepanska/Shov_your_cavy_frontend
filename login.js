

function store_token_helper_and_redirect(response) {
    console.log(response);
    if !(localStorage.user_id) {
      var user_id_value = JSON.parse(response.response).user_id
      var token_value = JSON.parse(response.response).uuid

      localStorage.setItem("token", token_value);
      localStorage.setItem("user_id", user_id_value);
      window.location.href = "index.html"
    } else {
      console.log("bad browser no storage")
    }
};


document.getElementById("login-btn").addEventListener("click", function(e){
  var params = {
      login: document.getElementById('inputLogin').value,
      password: document.getElementById('inputPassword').value
  };
  var url = 'http://127.0.0.1:8000/creatder/login/'
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201) {
          console.log(xhr)
          alert('You are now logged in.');
          store_token_helper_and_redirect(xhr);
        }
        else if (xhr.readyState == 4 && xhr.status == 400) {
            var parsed = JSON.parse(xhr.responseText);
            alert(parsed.non_field_errors[0])
        }
  }
  xhr.send(JSON.stringify(params))
  e.preventDefault()
});
