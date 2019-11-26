window.onload = function getUserData() {
    if (localStorage.user_id) {
        user_id = localStorage.getItem("user_id");
        token = localStorage.getItem("token");
        getResponse(
            `http://localhost:8000/creatder/users/${user_id}`, "GET", "formAjax"
        );
    } else {
      window.location.href = "login.html"
    }
}

function getResponse(url, method, ident) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        // readyState == 4 - response fully received
        if (this.readyState == 4 && this.status == 200) {
            var parsed = JSON.parse(this.response);
            innerHTMLresponse(parsed, ident);
        }
        else if (this.readyState == 4 && this.status !== 200) {
            // window.location.href = `error_page.html?=${this.status}`
            console.log(this.response)
        }
    };

    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Authorization", `${user_id}:${token}`);
    xhttp.send();
    return xhttp.response;

};

function innerHTMLresponse(json, ident) {
    console.log(json);
    var element = document.getElementById(ident);
      // element.innerHTML += `
      //   <div class="col-md-auto" id="col-info">
      //       <div class="row justify-content-md-left">
      //           <div class="col-md-auto py-2">
      //               <strong>Name</strong>
      //           </div>
      //           <div class="col-md-auto py-2">
      //               ${json["name"]}
      //           </div>
      //       </div>
      //       <div class="row justify-content-md-left">
      //           <div class="col-md-auto py-2">
      //               <strong>Login</strong>
      //           </div>
      //           <div class="col-md-auto py-2">
      //               ${json["login"]}
      //           </div>
      //       </div>
      //       <div class="row justify-content-md-left">
      //           <div class="col-md-auto py-2">
      //               <strong>Email</strong>
      //           </div>
      //           <div class="col-md-auto py-2">
      //               ${json["email"]}
      //           </div>
      //       </div>
      //       <div class="row justify-content-md-left">
      //           <div class="col-md-auto py-2">
      //               <strong>About myself</strong>
      //           </div>
      //           <div class="col-md-auto py-2">
      //               ${json["about_myself"]}
      //           </div>
      //       </div>
      //   </div>`

element.innerHTML +=
` <label for="inputName" class="sr-only">Name</label>
  <input type="name" id="inputName" class="form-control" value=${json["name"]} required>
  <label for="inputLogin" class="sr-only">Login</label>
  <input type="login" id="inputLogin" class="form-control" value=${json["login"]}  readonly>
  <label for="inputEmail" class="sr-only">Email address</label>
  <input type="email" id="inputEmail" class="form-control" value=${json["email"]} required autofocus>
  <label for="about_myself" class="sr-only">About myself</label>

  <textarea type="text" id="about_myself" class="form-control" name="text" rows="3" wrap="soft">${json["about_myself"]}</textarea>
  <button class="btn btn-primary btn-block" id="register-btn" type="submit">Submit changes</button>`
}

// <input type="text" id="about_myself" class="form-control" size="150" maxlength="255" value="${json["about_myself"]}">
document.querySelector('#formAjax').addEventListener("submit", function(e){
  e.preventDefault();

  var xhr = new XMLHttpRequest()
  var user_id = localStorage.getItem("user_id");
  var token = localStorage.getItem("token");

  var url = `http://localhost:8000/creatder/users/${user_id}/`
  var params = {
      name: document.querySelector('#inputName').value,
      email: document.querySelector('#inputEmail').value,
      about_myself: document.querySelector('#about_myself').value,

  };

  xhr.open('PUT', url, true)
  var auth_cred = `${user_id}:${token}`
  xhr.setRequestHeader('Authorization', auth_cred)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201 || xhr.readyState == 4 && xhr.status == 200) {
          alert('Your data has been changed');
          console.log(xhr.responseText)
          window.location.href = "file:///Users/marsza/workspace/zwierzu_front/user_settings.html"
      }
  }
  xhr.send(JSON.stringify(params))

});
