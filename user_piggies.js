
window.onload = function getUserData() {
    if (localStorage.user_id) {
        user_id = localStorage.getItem("user_id");
        token = localStorage.getItem("token");
        getResponse(
            `http://localhost:8000/creatder/users/${user_id}/creatures/`, "GET", "pig_target"
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
            if (json[i]["creature_card_photo"] == null) {
                var info_photo = "photo_info.png"
            } else {
                var info_photo = json[i]["creature_card_photo"]
            }

            element.innerHTML +=
            `<hr class="featurette-divider">
            <div class="row featurette bg-light">
              <div class="col-md-7 order-md-2">
                <h2 class="featurette-heading">Name:${json[i]["name"]}</h2>
                <button type="button" class="btn btn-lg btn-outline-secondary" onclick="location.href='upload_photo.html?id=${json[i]["id"]}'">View&Upload photo</button>
              </div>
              <div class="col-md-5 order-md-1">
                <img class="bd-placeholder-img-lg featurette-image img-fluid mx-auto" src="/Users/marsza/workspace/media/${info_photo}" alt="swinia" width="500" height="500">
              </div>
            </div>` }
    } else {
        element.innerHTML +=
        `<div class="container">
            <h2 class="text-muted">You haven't added any piggies yet</h2>
            <br>
            <a href="add_pig.html" class="btn-lg btn-primary">Add your pig</a>
        </div>`
    }
};
