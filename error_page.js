window.onload = function loadDoc() {
    var query_error = window.location.search
    var error_num = query_error.slice(1)

    document.getElementById("error").innerHTML =`<h1>${error_num}</h1>`
};
