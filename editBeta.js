// const { default: Panzoom } = require("@panzoom/panzoom");

function updateRouteInfo() {
  document.getElementById("title").innerHTML = localStorage["title"];
  // document.getElementById("routePic").src = localStorage["routePic"];
  // document.getElementById("routePic").src = "Bike3.jpg";
}

var rfCounter = 0; // Global counter for right foot holds
var rhCounter = 0; // Global counter for right hand holds
var lfCounter = 0; // Global counter for left foot holds
var lhCounter = 0; // Global counter for left hand holds
let holds = [];

const elem = document.getElementById("panzoom");
const panzoom = Panzoom(elem, {
  maxScale: 5,
  canvas: true,
  contain: "outside",
});
panzoom.zoom(1, { animate: true });

document
  .getElementById("panzoom")
  .parentElement.addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
      adjustScale(true);
    } else if (event.deltaY > 0) {
      adjustScale(false);
    }
  });

zoomIn.addEventListener("click", () => adjustScale(true));
zoomOut.addEventListener("click", () => adjustScale(false));

function addHold(type) {
  var hold = document.createElement("button");
  hold.setAttribute("class", "hold");
  var holdID = "";
  if (type == "rf") {
    rfCounter++;
    hold.innerHTML =
      '<img src="Icons/solid_foot_r.png" width="20"/>' + rfCounter;
    holdID = type + rfCounter.toString();
  } else if (type == "rh") {
    rhCounter++;
    hold.innerHTML =
      rhCounter + '<img src="Icons/solid_right_hand_1.png" width="20"/>';
    holdID = type + rhCounter.toString();
  } else if (type == "lf") {
    lfCounter++;
    hold.innerHTML =
      lfCounter + '<img src="Icons/solid_foot_l.png" width="20"/>';
    holdID = type + lfCounter.toString();
  } else if (type == "lh") {
    lhCounter++;
    hold.innerHTML =
      lhCounter + '<img src="Icons/solid_left_hand_1.png" width="20"/>';
    holdID = type + lhCounter.toString();
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
  // panzoomHold.pan(1000, 1000);
  setTimeout(() => panzoomHold.pan(50, 50));
  holds.push(panzoomHold);
}

function adjustScale(zoomIn) {
  const oldScale = panzoom.getScale();
  if (zoomIn) {
    panzoom.zoomIn();
  } else {
    panzoom.zoomOut();
  }
  const newScale = panzoom.getScale();
  holds.forEach((element) => {
    const pan = element.getPan();
    // Adjust children starting X/Y according the new scale for panning
    element.pan((pan.x / oldScale) * newScale, (pan.y / oldScale) * newScale, {
      animate: true,
    });
  });
}
