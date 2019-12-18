
window.onload = function loadDoc() {
    getResponse(
        "http://127.0.0.1:8000/creatder/creatures_all/1/", "GET", "pig_target"
    );
};

function getResponse(url, method, ident) {
    var xhttp = new XMLHttpRequest();
    console.log(localStorage.length)

    if (localStorage.length !== 0) {
        var user_id = localStorage.getItem("user_id");
        var token = localStorage.getItem("token");
    } else {
      console.log("bad browser no storage")
    }

    xhttp.onreadystatechange = function() {
        // readyState == 4 - response fully received
        if (this.readyState == 4 && this.status == 200) {
            console.log(this)
            var parsed = JSON.parse(this.response);
            multiplyDiv(ident, parsed.objects.length, parsed.objects, user_id);
        }
    };

    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Authorization", `${user_id}:${token}`);
    xhttp.send();
    console.log(xhttp.responseText);
    return xhttp.response;
};

function multiplyDiv(ident, count, json, user_id) {
    var element = document.getElementById(ident);
      if (count < 6) {var cards = count}
      else {var cards = 6}

    for (var i=0; i<cards; i++) {
        if (json[i]["creature_card_photo"] == null) {
            var info_photo = "photo_info.png"
        } else {
            var info_photo = json[i]["creature_card_photo"]
        }
        if (json[i]["owner"]["id"] == user_id) {
          console.log('dzial')
          element.innerHTML += `
          <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                  <img class="card-img-top" src="../${info_photo}" alt="swinia" width="100%" height="250">
                  <div class="card-body">
                      <p class="card-text">Name: ${json[i]["name"]}</p>
                      <p class="card-text">Owner: ${json[i]["owner"]["login"]}</p>
                      <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="location.href='upload_photo.html?id=${json[i]["id"]}'">View & upload photo</button>
                          </div>
                          <div class="rating-star">
                              <small class="text-muted">${json[i]["average_rating"]}</small>
                              <img src="pictures/star.jpg" alt="" width="40" height="45">
                          </div>
                      </div>
                  </div>
              </div>
          </div>`
      } else {
        element.innerHTML += `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" src="../${info_photo}" alt="swinia" width="100%" height="250">
                <div class="card-body">
                    <p class="card-text">Name: ${json[i]["name"]}</p>
                    <p class="card-text">Owner: ${json[i]["owner"]["login"]}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="location.href='rating.html?id=${json[i]["id"]}'">View & rate</button>
                        </div>
                        <div class="rating-star">
                            <small class="text-muted">${json[i]["average_rating"]}</small>
                            <img src="pictures/star.jpg" alt="" width="40" height="45">
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    }


};
