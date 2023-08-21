  console.log(screen.width);
  // Hamburger menu Handler
  const hambtn = document.getElementById("hamburger");
  const loginBtn = document.getElementById("loginBtn");
  const smallScreenLinks = document.getElementById("small-screens-links-ul");
  
  console.log(smallScreenLinks);
  
  smallScreenLinks.style.display = "none";
  loginBtn.style.display = "none";
  
  hambtn.addEventListener("click", () => {
    console.log(smallScreenLinks.style.display, loginBtn.style.display);
    if (loginBtn.style.display == "none") {
      smallScreenLinks.style.display = "flex";
      loginBtn.style.display = "block";
    } else {
      smallScreenLinks.style.display = "none";
      loginBtn.style.display = "none";
    }
  });
  
  const loginBtn2 = document.getElementById("loginBtn2").addEventListener("click", function() {
    window.location.href = "http://127.0.0.1:3000/signin";
  });

  loginBtn.addEventListener("click", function() {
    window.location.href = "http://127.0.0.1:3000/signin";
  });

  