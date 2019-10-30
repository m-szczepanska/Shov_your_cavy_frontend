
window.onload = function loadDoc() {
    getResponse(
        "http://localhost:8000/creatder/creatures/", "GET", "pig_target"
    );
};

function getResponse(url, method, ident) {
    var xhttp = new XMLHttpRequest();
    // factor this bit out to a separate method

    xhttp.onreadystatechange = function() {
        // readyState == 4 - response fully received
        if (this.readyState == 4 && this.status == 200) {
            var parsed = JSON.parse(this.response);
            multiplyDiv(ident, parsed.length, parsed);
        }
    };

    xhttp.open(method, url, true);
    xhttp.send();
    console.log(xhttp.responseText);
    return xhttp.response;
};

function multiplyDiv(ident, count, json) {
    console.log(json);
    var element = document.getElementById(ident);
    for (var i=0; i<count; i++)
        // element.innerHTML += `
        //     <p class="inner">
        //         Name: ${json[i]["name"]}<br>
        //         Age: ${json[i]["age"]}<br>
        //     </p>`;
        element.innerHTML += `
        <div class="col-md-3">
            <div class="card mb-3 shadow-sm">
                <img class="card-img-top" src="pictures/swin.jpg" alt="swinia", width="50%">
                <div class="card-body">
                    <p class="card-text">Name: ${json[i]["name"]}</p>
                    <p class="card-text">Owner: ${json[i]["owner"]["login"]}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">Rate</button>
                        </div>
                        <div class="rating-star">
                            <small class="text-muted">${json[i]["average_rating"]}</small>
                            <img src="pictures/star.jpg" alt="" width="30" height="35">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `


};


//onclick="loadDoc('http://localhost:8000/creatder/creatures/', myFunction)"
