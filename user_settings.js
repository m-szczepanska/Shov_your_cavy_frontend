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
        }
    };

    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Authorization", `${user_id}:${token}`);
    xhttp.send();
    return xhttp.response;

};

function innerHTMLresponse(json, ident) {
    var element = document.getElementById(ident);

  element.innerHTML +=
  ` <div class="form-group">
        <label class="sr-only" for="inputName" >Name</label>
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">Name</div>
            </div>
            <input type="name" id="inputName" class="form-control" value=${json["name"]} >
        </div>
    </div>
    <div class="form-group">
          <label for="inputLogin" class="sr-only">Login</label>
          <div class="input-group">
              <div class="input-group-prepend">
                  <div class="input-group-text">Login</div>
              </div>
              <input type="login" id="inputLogin" class="form-control" value=${json["login"]}  readonly>
          </div>
    </div>
    <div class="form-group">
          <label for="inputEmail" class="sr-only">Email address</label>
          <div class="input-group">
              <div class="input-group-prepend">
                  <div class="input-group-text">Email adress</div>
              </div>
              <input type="email" id="inputEmail" class="form-control" value=${json["email"]}>
          </div>
    </div>
    <div class="form-group">
          <label for="about_myself" class="sr-only">About myself</label>
          <div class="input-group">
              <div class="input-group-prepend">
                  <div class="input-group-text">About myself</div>
              </div>
              <textarea type="text" id="about_myself" class="form-control" name="text" rows="3" wrap="soft">${json["about_myself"]}</textarea>
              </div>
        </div>

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
          window.location.href = "user_settings.html"
      }
  }
  xhr.send(JSON.stringify(params))

});
