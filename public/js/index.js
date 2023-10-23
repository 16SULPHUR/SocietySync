  console.log(screen.width);
  // Hamburger menu Handler
  // const hambtn = document.getElementById("hamburger");
  // const loginBtn = document.getElementById("loginBtn");
  // const smallScreenLinks = document.getElementById("small-screens-links-ul");
  
  // console.log(smallScreenLinks);
  
  // smallScreenLinks.style.display = "none";
  // // loginBtn.style.display = "none";
  
  // hambtn.addEventListener("click", () => {
  //   console.log("ham btn")
  //   console.log(smallScreenLinks.style.display, loginBtn.style.display);
  //   if (loginBtn.style.display == "none") {
  //     smallScreenLinks.style.display = "flex";
  //     loginBtn.style.display = "block";
  //   } else {
  //     smallScreenLinks.style.display = "none";
  //     loginBtn.style.display = "none";
  //   }
  // });

  const hambtn = document.getElementById("hamburger");
const colLinks = document.getElementById("colLinks");
const rowLinks = document.getElementById("rowLinks");
const logoutbtn = document.getElementById("logoutbtn");

colLinks.style.display="none"

hambtn.addEventListener("click", () => {
  if(colLinks.style.display=="none"){
  colLinks.style.display="block"
  logoutbtn.style.display="block"
}else{
  colLinks.style.display="none"
  logoutbtn.style.display="none"
  }
});


  // Function to automatically scroll the div horizontally
  
  scrollRound = 0;
  let round1Scroll = 0;
  let round0Scroll = 0;
  function autoScrollDiv() {
    const scrollableDiv = document.getElementById("scrollable");
    const scrollAmount = scrollableDiv.clientWidth;

    if (screen.width <= 390) {
      // const scrollAmount = 370;
      // scrollableDiv.scrollLeft += scrollAmount;

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

      // Check if the scroll reaches the end and reset to the beginning
      //   if (
      //     scrollableDiv.scrollLeft >=
      //     scrollableDiv.scrollWidth - scrollableDiv.clientWidth ||
      //     scrollableDiv.scrollLeft == 1849.5999755859375
      //     ) {
      //   // scrollableDiv.scrollLeft -= scrollAmount;
      //   scrollableDiv.scrollLeft = 0;

      // }
    } else {
      // scrollableDiv.scrollLeft += scrollAmount;
      // const scrollAmount = 1200;

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

      // Check if the scroll reaches the end and reset to the beginning
      // if (
      //   scrollableDiv.scrollLeft >=
      //     scrollableDiv.scrollWidth - scrollableDiv.clientWidth ||
      //   scrollableDiv.scrollLeft == 1113.5999755859375
      // ) {
      //   // scrollableDiv.scrollRight = 0;
      //   scrollableDiv.scrollLeft = 0;
      // }

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

  // Set the interval to call the autoScrollDiv function every 3 seconds (adjust as needed)
  window.onload = function () {
    setInterval(autoScrollDiv, 1500); // Lower interval for smoother continuous scrolling
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
