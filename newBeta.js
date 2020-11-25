function doneClicked() {
  var inputTitle = document.forms["routeInfoForm"]["title"].value;
  var inputPic = document.forms["routeInfoForm"]["routePic"].value;
  if (inputTitle == "") {
    localStorage["title"] = "Untitled Route";
  }
  else {
    localStorage["title"] = inputTitle;
  }
  localStorage["routePic"] = inputPic;
  location.href='editBeta.html';
}
