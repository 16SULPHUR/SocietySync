// document.getElementById("sidebar1").style.display="none"
document.getElementById("sidebar1").style.display = "none";
document.getElementById("sidebar2").style.display = "none";
const logoutbtn = document.getElementById("logoutbtn");

// expand sidebar
function expandSidebar(hamBtn) {
  console.log(hamBtn);
  if (hamBtn == "hamBtn1") {
    if (document.getElementById("sidebar1").style.display == "block") {
      document.getElementById("sidebar1").style.display = "none";
    }
    else{
      document.getElementById("sidebar1").style.display = "block";
    }
  } else {
    if (document.getElementById("sidebar2").style.display == "block") {
      document.getElementById("sidebar2").style.display = "none";
    }
    else{
      document.getElementById("sidebar2").style.display = "block";
    }
  }
}

// close sidebar
function w3_close11(sidebar) {
  if (sidebar == "sidebar1") {
    document.getElementById("sidebar1").style.display = "none";
  } else {
    document.getElementById("sidebar2").style.display = "none";
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






const profileEditModal = document.getElementById('profileEditModal');
const closeModal = document.getElementById('closeModal');
const saveChanges = document.getElementById('saveChanges');
const editProfileButton = document.getElementById('editbtn');
const previewImage = document.getElementById('previewImage');

// Show the modal when the "Edit Profile" button is clicked
editProfileButton.addEventListener('click', () => {
  profileEditModal.classList.remove('hidden');
});

// Close the modal when the "Close" button or overlay is clicked
closeModal.addEventListener('click', () => {
  profileEditModal.classList.add('hidden');
});

saveChanges.addEventListener('click', () => {
  // profileEditModal.classList.add('hidden');

  console.log("changes saved")
});


// Get the profile photo input element
const profilePhotoInput = document.getElementById('profilePhoto');

// Add an event listener to detect changes in the profile photo input
profilePhotoInput.addEventListener('change', (event) => {
  // Get the selected file
  const selectedFile = event.target.files[0];

  // You can now do something with the selected file, such as displaying a preview
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Display a preview of the selected image, for example, in an image element
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  }
});






// An array of available Tailwind CSS classes
const availableColors = ["fuchsia-600", "orange-600", "yellow-600", "blue-600", "green-600", "red-600"];

function getRandomColor() {
  // Generate a random index to select a color from the availableColors array
  const randomIndex = Math.floor(Math.random() * availableColors.length);
  return availableColors[randomIndex];
}
