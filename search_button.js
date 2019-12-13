function SearchFunction() {
  var search_text = document.getElementById("mySearch").value;
  window.location.href = `search.html?=${search_text}`
}
