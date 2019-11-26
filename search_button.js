function SearchFunction() {
  var search_text = document.getElementById("mySearch").value;
  alert(search_text)
  window.location.href = `search.html?=${search_text}`
}
