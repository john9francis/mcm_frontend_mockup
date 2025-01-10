const sidebar = document.querySelector("aside");

const cancelButton = document.getElementById("cancelSearch")
const cancelShowText = "Show Menu"
const cancelHideText = "Hide Menu"

document.addEventListener("DOMContentLoaded", ()=>{
  cancelButton.addEventListener("click", _toggleSidebar);
  cancelButton.innerText = cancelShowText
})

function _setSidebarTop(){
  const navbar = document.querySelector("nav");

  const navRect = navbar.getBoundingClientRect();

  const sidebarTop = navRect.top + navRect.height;

  
  sidebar.style.top = `${sidebarTop}px`
  sidebar.style.height = `calc(100vh - ${sidebarTop}px)`
}

function _toggleSidebar(){
  sidebar.classList.toggle('show')

  if (cancelButton.innerText == cancelShowText){
    cancelButton.innerText = cancelHideText
  } else if (cancelButton.innerText == cancelHideText){
    cancelButton.innerText = cancelShowText
  }
}

function _showSidebar(){
  if (!sidebar.classList.contains('show')){
    _toggleSidebar();
  }
}
