// document.getElementById("sidebar1").style.display="none"
document.getElementById("sidebar1").style.display="none"
document.getElementById("sidebar2").style.display="none"
const logoutbtn = document.getElementById("logoutbtn");

// expand sidebar
function expandSidebar(hamBtn){
  console.log(hamBtn)
  if(hamBtn == "hamBtn1"){
      document.getElementById("sidebar1").style.display="block"
  }
  else{
      document.getElementById("sidebar2").style.display="block"
  }
}

// close sidebar
function w3_close(sidebar){
  if(sidebar=='sidebar1'){
      document.getElementById("sidebar1").style.display="none"
  }
  else{
      document.getElementById("sidebar2").style.display="none"
  }
}

// Function to automatically scroll the events div horizontally

scrollRound = 0;
let round1Scroll = 0;
let round0Scroll = 0;
function autoScrollDiv() {
  const scrollableDiv = document.getElementById("scrollable");
  const scrollAmount = scrollableDiv.clientWidth;

  if (screen.width <= 390) {
    if (scrollRound == 0) {
      round0Scroll = scrollableDiv.scrollLeft;
      scrollRound = 1;
    } else {
      round1Scroll = scrollableDiv.scrollLeft;
      scrollRound = 0;
    }

    console.log(
      "Scroll left : ",
      scrollableDiv.scrollLeft,
      "Scroll round : ",
      scrollRound,
      "round 0 scroll : ",
      round0Scroll,
      "round 1 scroll : ",
      round1Scroll
    );

    if (scrollableDiv.scrollLeft == 0) {
      console.log("scrolled left");
      scrollableDiv.scrollLeft += scrollAmount;
    } else if (!(round0Scroll == round1Scroll)) {
      scrollableDiv.scrollLeft += scrollAmount;
    } else {
      scrollableDiv.scrollLeft = 0;
    }

    console.log(
      scrollableDiv.scrollLeft,
      scrollableDiv.scrollWidth - scrollableDiv.clientWidth
    );
  } else {

    if (scrollRound == 0) {
      round0Scroll = scrollableDiv.scrollLeft;
      scrollRound = 1;
    } else {
      round1Scroll = scrollableDiv.scrollLeft;
      scrollRound = 0;
    }

    console.log("Scroll round : ", scrollRound);

    console.log(
      scrollableDiv.scrollLeft,
      scrollableDiv.scrollWidth - scrollableDiv.clientWidth
    );
    if (scrollableDiv.scrollLeft == 0) {
      console.log("scrolled left");
      scrollableDiv.scrollLeft += scrollAmount;
    } else if (!(round0Scroll == round1Scroll)) {
      scrollableDiv.scrollLeft += scrollAmount;
    } else {
      scrollableDiv.scrollLeft = 0;
    }
  }
}

window.onload = function () {
  setInterval(autoScrollDiv, 1500);
};


