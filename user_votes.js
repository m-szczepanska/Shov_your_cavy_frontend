
window.onload = function getUserData() {
    if (localStorage.user_id) {
        user_id = localStorage.getItem("user_id");
        token = localStorage.getItem("token");
        getResponse(
            `http://localhost:8000/creatder/users/${user_id}/ratings/`, "GET", "pig_target"
        );
    } else {
        alert("You are not logged in, your piggies too!")
        window.location.href = "login.html"
    }
}

function getResponse(url, method, ident) {
    var xhttp = new XMLHttpRequest();
    // factor this bit out to a separate method

    xhttp.onreadystatechange = function() {
        // readyState == 4 - response fully received
        if (this.readyState == 4 && this.status == 200) {
            var parsed = JSON.parse(this.response);
            multiplyDiv(ident, parsed.length, parsed);
        }
        else if (this.readyState == 4 && this.status !== 200) {
            window.location.href = `error_page.html?=${this.status}`
        }
    };

    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Authorization", `${user_id}:${token}`);
    xhttp.send();
    console.log(xhttp.responseText);
    return xhttp.response;
};

function multiplyDiv(ident, count, json) {
    console.log(json);
    var element = document.getElementById(ident);
    if (count > 0) {
        for (var i=0; i<count; i++) {
            element.innerHTML +=
            `
            <div class="container">
              <div class="col-md-7 order-md-2">
                <p><strong>Pig name</strong>: ${json[i]["creature"]["name"]}</p>
                <p><strong>When rated</strong>: ${json[i]["pub_date"].slice(0,10)}</p>
                <p><strong>Comment</strong>: ${json[i]["comment"]}</p>
                <p><strong>Rating</strong>: ${json[i]["rating"]}</p>
              </div>
            </div>
            <hr>` }
    } else {
        element.innerHTML +=
        `<div class="container">
            <h2 class="text-muted">You haven't commented any piggies yet</h2>
            <br>
            <a href="get_all_creatures.html" class="btn-lg btn-primary">Comment pig</a>
        </div>`
    }
};
