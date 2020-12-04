function updateRouteInfo() {
  document.getElementById("title").innerHTML = localStorage["title"];
  // document.getElementById("routePic").src = localStorage["routePic"];
  // document.getElementById("routePic").src = "Bike3.jpg";
}

var rfCounter = 0; // Global counter for right foot holds
var rhCounter = 0; // Global counter for right hand holds
var lfCounter = 0; // Global counter for left foot holds
var lhCounter = 0; // Global counter for left hand holds

const elem = document.getElementById("panzoom");
const panzoom = Panzoom(elem, {
  maxScale: 10,
  canvas: true,
  contain: "outside",
});
panzoom.pan(10, 10);
panzoom.zoom(1, { animate: true });
document
  .getElementById("panzoom")
  .parentElement.addEventListener("wheel", panzoom.zoomWithWheel);

function addHold(type) {
  var hold = document.createElement("button");
  hold.setAttribute("class", "hold");
  var holdID = "";
  if (type == "rf") {
    hold.innerHTML = '<img src="Icons/outline_right_foot_1.png" width="15"/>';
    rfCounter++;
    holdID = type + rfCounter.toString();
  } else if (type == "rh") {
    hold.innerHTML = '<img src="Icons/outline_right_hand_2.png" width="15"/>';
    rhCounter++;
    holdID = type + rhCounter.toString();
  } else if (type == "lf") {
    hold.innerHTML = '<img src="Icons/outline_left_foot_1.png" width="15"/>';
    lfCounter++;
    holdID = type + lfCounter.toString();
  } else if (type == "lh") {
    hold.innerHTML = '<img src="Icons/outline_left_hand_2.png" width="15"/>';
    lhCounter++;
    holdID = type + lfCounter.toString();
  }
  hold.setAttribute("id", holdID);
  elem.appendChild(hold);

  const aHold = document.getElementById(holdID);
  const panzoomHold = Panzoom(aHold, {
    setTransform: (elem, { x, y, scale }) => {
      // Adjust the panning according to the parent's scale
      const parentScale = panzoom.getScale();
      panzoomHold.setStyle(
        "transform",
        `scale(${scale}) translate(${x / parentScale}px, ${y / parentScale}px)`
      );
    },
  });
  panzoomHold.pan(100, 100);

  document
    .getElementById("panzoom")
    .parentElement.addEventListener("wheel", panzoomHold.zoomWithWheel);
}

// function adjustScale(zoomIn) {
//   const oldScale = panzoom.getScale();
//   if (zoomIn) {
//     panzoom.zoomIn();
//   } else {
//     panzoom.zoomOut();
//   }
//   const newScale = panzoom.getScale();
//   const pan = panzoom2.getPan();
//   // Adjust child starting X/Y according the new scale for panning
//   panzoom2.pan((pan.x / oldScale) * newScale, (pan.y / oldScale) * newScale, {
//     animate: true,
//   });
// }
