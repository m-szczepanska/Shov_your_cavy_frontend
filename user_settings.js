window.onload = function getUserData() {
    if (typeof(Storage) !== "undefined") {
        var user_id = localStorage.getItem("user_id");
        var token = localStorage.getItem("token");
        getResponse(
            `http://localhost:8000/creatder/users/${user_id}`, "GET", "user_data", "user_id", "token"
        );
    } else {
      window.location.href = "login.html"
    }
}

function getResponse(url, method, ident, user_id, token) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        // readyState == 4 - response fully received
        if (this.readyState == 4 && this.status == 200) {
            var parsed = JSON.parse(this.response);
            innerHTMLresponse(parsed, ident);
        }
    };

    xhttp.open(method, url, true);
    // var auth_header =user_id.
    xhttp.setRequestHeader("Authorization", `${user_id}:${token}`);
    xhttp.send();
    return xhttp.response;
};

function innerHTMLresponse(json, ident) {
    console.log(json);
    var element = document.getElementById(ident);
      element.innerHTML += `
        <div class="col align-items-center">
            <div class="row align-items-center">
                Name: ${json["name"]}
            </div>
            <div class="row align-items-center">
                Login: ${json["login"]}
            </div>
            <div class="row align-items-center">
                Email: ${json["email"]}
            </div>
            <div class="row align-items-center">
                About myself: ${json["about_myself"]}
            </div>
        </div>`
}
