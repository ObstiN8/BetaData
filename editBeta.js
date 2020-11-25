function updateRouteInfo() {
  document.getElementById("title").innerHTML = localStorage["title"];
  document.getElementById("routePic").src = localStorage["routePic"];
  // document.getElementById("routePic").src = "Bike3.jpg";
}
