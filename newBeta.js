function doneClicked() {
  var inputTitle = document.forms["routeInfoForm"]["title"].value;
  var inputPic = document.forms["routeInfoForm"]["routeUpload"].value;
  if (inputTitle == "") {
    localStorage["title"] = "Untitled Route";
  } else {
    localStorage["title"] = inputTitle;
  }
  localStorage["routeUpload"] = inputPic;
  location.href = "editBeta.html";
}
