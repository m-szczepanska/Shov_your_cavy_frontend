window.onload = function getUserData() {
    if (localStorage.user_id) {
        user_id = localStorage.getItem("user_id");
        token = localStorage.getItem("token");
        postResponse(
            `http://localhost:8000/creatder/creatures/search/`, "POST"
        );
    } else {
      window.location.href = "login.html"
    }
}

function postResponse(url, method) {
    var xhr = new XMLHttpRequest();

    var query_search = window.location.search
    var search_phrase = query_search.slice(2)
    console.log(search_phrase)

    var params = {
        search_field: search_phrase
    };

    xhr.open(method, url, true)
    var auth_cred = `${user_id}:${token}`
    xhr.setRequestHeader('Authorization', auth_cred)
    xhr.setRequestHeader('Content-type', 'application/json')

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 201 || xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText)
            var parsed = JSON.parse(this.response);
            innerHTMLresponse(parsed, parsed.length, 'search-result');
        }
    }
    xhr.send(JSON.stringify(params))
};


function innerHTMLresponse(json, count, ident) {
    console.log(json);
    console.log(count);
    var element = document.getElementById(ident);
    if (count > 0) {
      for (var i=0; i<count; i++) {
        var num = 1+i;
        if (json[i]["owner"]["id"] == localStorage.getItem("user_id")) {
            var url_redirect = 'upload_photo';
        }
        else {
            var url_redirect = 'rating';
        }
        console.log(json[i]["owner"]["id"], localStorage.getItem("user_id"))
        element.innerHTML += `
        <div class="container">
            <a href='${url_redirect}.html?id=${json[i]["id"]}'><strong>${num}. ${json[i]["name"]}</strong></a>
            <p>
            <strong>Age</strong>: ${json[i]["age"]},
            <strong>Sex</strong>: ${json[i]["sex"]},
            <strong>Breed</strong>: ${json[i]["breed"]},
            <strong>Color pattern</strong>: ${json[i]["color_pattern"]},
            <strong>Owner</strong>: ${json[i]["owner"]["name"]}
            </p>
            <hr>
          </div>`
      }
  } else {
      element.innerHTML += `
      <div class="container">
          <h5 class="text-muted">
            Your search did not match any creatures.<br>
            Check if all words are spelled correctly.
          </h5>
        </div>`

  }
}
