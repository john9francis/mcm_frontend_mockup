const sidebar = document.querySelector(".fixed");
const navbar = document.querySelector("nav");
const navRect = navbar.getBoundingClientRect();
const sidebarTop = navRect.top + navRect.height;
const root = document.documentElement;

document.addEventListener("DOMContentLoaded", ()=>{
  _setSidebarTop()
  _setSearchTopWidescreen()
})

function _setSidebarTop(){
  sidebar.style.top = `${sidebarTop}px`
  sidebar.style.height = `calc(100vh - ${sidebarTop}px)`
}

function _setSearchTopWidescreen(){
  root.style.setProperty("--search-top-widescreen", `${sidebarTop}px`)
}
