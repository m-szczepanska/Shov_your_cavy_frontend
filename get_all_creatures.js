
window.onload = function loadDoc() {
    var query_page = window.location.search
    var user_id = localStorage.getItem("user_id");
    var page = query_page.slice(6)
    var url = `http://localhost:8000/creatder/creatures_all/${page}/`
    var ident = "pig_target"

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var parsed = JSON.parse(this.response);
            multiplyDiv(ident, parsed.objects.length, parsed.objects, user_id);
            var pages_count = parsed["max_page"]
            localStorage.setItem("pages_count", pages_count)
            changePage(page, pages_count)
            pagination_item("pagination_item", parsed, pages_count, page);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
};



function multiplyDiv(ident, count, json, user_id) {
    console.log(json);
    var element = document.getElementById(ident);
    for (var i=0; i<count; i++) {
        console.log(json[i]["creature_card_photo"])
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
                <img class="card-img-top" src="/Users/marsza/workspace/media/${info_photo}" alt="swinia" width="100%" height="250">
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
              <img class="card-img-top" src="/Users/marsza/workspace/media/${info_photo}" alt="swinia" width="100%" height="250">
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
    };

};

function pagination_item(ident, json, pages_count, page) {
    console.log(json.objects);
    var element = document.getElementById(ident);
    var page = Number(page)

    if (pages_count > 3 && pages_count - page <=2 && page >2){
    element.innerHTML += `
        <li class="page-item" class="p-2">
        <a class="page-link" href="get_all_creatures.html?page=${pages_count-2}">${pages_count-2}
        </a></li>
        <li class="page-item" class="p-2">
        <a class="page-link" href="get_all_creatures.html?page=${pages_count-1}">${pages_count-1}
        </a></li>
        <li class="page-item" class="p-2">
        <a class="page-link" href="get_all_creatures.html?page=${pages_count}">${pages_count}
        </a></li>`

    } else if ((pages_count > 3 && page >=2)) {
        element.innerHTML += `
            <li class="page-item" class="p-2">
            <a class="page-link" href="get_all_creatures.html?page=${page-1}">${page-1}
            </a></li>
            <li class="page-item" class="p-2">
            <a class="page-link" href="get_all_creatures.html?page=${page}"><strong>${page}</strong>
            </a></li>
            <li class="page-item" class="p-2">
            <a class="page-link" href="get_all_creatures.html?page=${page+1}">${page+1}
            </a></li>`

    // } else if (pages_count > 3 && page < 2) {
    //     for (var i=1; i<(pages_count); i++) {
    //         element.innerHTML += `
    //         <li class="page-item" class="p-2">
    //         <a class="page-link" href="get_all_creatures.html?page=${i}">${i}
    //         </a></li>`
    //     }
    } else {
        for (var i=1; i<(pages_count); i++) {
            element.innerHTML += `
            <li class="page-item" class="p-2">
            <a class="page-link" href="get_all_creatures.html?page=${i}">${i}
            </a></li>`
        }
    }
};

var current_page = window.location.search.slice(6);

function prevPage() {
    if (current_page > 1) {
        current_page--;
        window.location.href = `get_all_creatures.html?page=${current_page}`
    }
};

function nextPage() {
    var pages_count = localStorage.getItem("pages_count");
    if (current_page < pages_count) {
        current_page++;
        window.location.href = `get_all_creatures.html?page=${current_page}`
    }
};

function firstPage() {
    window.location.href = "get_all_creatures.html?page=1"
};

function lastPage() {
    var pages_count = localStorage.getItem("pages_count");
    window.location.href = `get_all_creatures.html?page=${pages_count}`
};

function changePage(page_num, pages_count) {
    var next = document.getElementById('btn_next');
    var prev = document.getElementById('btn_prev');
    // Validate page
    if (page_num < 1) page_num = 1;
    if (page_num > pages_count) page_num = pages_count;

    if (page_num == 1) {
        btn_prev.style.display = "none";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page_num == pages_count) {
        btn_next.style.display = "none";
    } else {
        btn_next.style.visibility = "visible";
    }
}
