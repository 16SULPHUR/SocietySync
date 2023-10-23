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