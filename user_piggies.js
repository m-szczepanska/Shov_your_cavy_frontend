
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
              <div class="col-md-3 order-md-2">
                <p class="own-pig-heading">Name:${json[i]["name"]}</p>
                <button type="button" class="btn btn-outline-warning" onclick="location.href='upload_photo.html?id=${json[i]["id"]}'">View & upload photo</button>
                <button type="button" class="btn btn-outline-danger my-3" id="delete_pig" onclick='javascript:delPig(${json[i]["id"]});'>Delete pig</button>
              </div>
              <div class="col-md-3 order-md-3">
                <ul class="own-pig-heading">Further info:</ul>
                    <li class="own-pig-info">Rating: ${json[i]["average_rating"]}</li>
                    <li class="own-pig-info">Added on: ${json[i]["pub_date"].slice(0,10)}</li>
                <ul>
              </div>
              <div class="col-md-5 order-md-1">
                <img class="bd-placeholder-img-lg featurette-image img-fluid mx-auto" src="../${info_photo}" alt="swinia" width="500" height="500">
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

function delPig(pig_id) {
    console.log('dziala')
    if (localStorage.length !== 0) {
        var user_id = localStorage.getItem("user_id");
        var token = localStorage.getItem("token");
    } else {
      console.log("You can't delete this pig")
    }

    if (window.confirm("Do you really want to delete this pig?")) {

        var url = `http://localhost:8000/creatder/creatures/${pig_id}`;
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.setRequestHeader("Authorization", `${user_id}:${token}`);

        xhr.onload = function () {
        	if (xhr.readyState == 4 && xhr.status == "200") {
                alert("Bye, pig!")
        		window.location.href = "user_piggies.html"
        	} else {
        		console.error(responseInfo);
        	}
        }
        xhr.send();
    }
};
