console.log(screen.width);
// Hamburger menu Handler
const hambtn = document.getElementById("hamburger");
const colLinks = document.getElementById("colLinks");
const rowLinks = document.getElementById("rowLinks");

colLinks.style.display="none"

hambtn.addEventListener("click", () => {
  if(colLinks.style.display=="none"){
  colLinks.style.display="block"
  }else{
    colLinks.style.display="none"
  }
});


// password show hide function
function showPass(chkBox){
  console.log(chkBox);
  let ipField = document.getElementById('password');
  if(chkBox.checked){
    ipField.type='text';
  }else{
    ipField.type='password';
  }
}