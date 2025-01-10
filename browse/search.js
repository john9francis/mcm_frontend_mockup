// ensure _fillModelContainer() gets called
document.addEventListener("DOMContentLoaded", _fillModelContainer)

const modelContainer = document.getElementById("all_models");
const loaderContainer = document.getElementById("loader")

let allModelsLoaded = false;

const modelCardHtml = `
<a href="../repo/repo.html" class="card mini-card rand-rotate1" style="height: 200px;" href="#">
  <img style="height:80px;" src="../assets/atom.png">
  <p>
    Model
  </p>
</a>
`

const userCardHtml = `
<a href="../user/user.html" class="card mini-card rand-rotate1" style="height: 200px;" href="#">
  <img style="height:80px;" src="../assets/eye.png">
  <p>
    User
  </p>
</a>
`

let cardHtml = ''


const loaderHtml = `
    <div style="display: flex; flex-direction: column;">
  <div class="banter-loader">
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
    <div class="banter-loader__box"></div>
  </div>
  <p style="margin-top: 40px;">Loading...</p>
  </div>`

function showLoader(){
  loaderContainer.innerHTML = loaderHtml
}

function hideLoader(){
  loaderContainer.innerHTML = ""
}

async function _getFromServer(_searchQuery=""){
  let html = ""

  const rotateChoices = [
    "rand-rotate1",
    "rand-rotate2",
    "rand-rotate3",
    "rand-rotate4",
  ]

  // this will be replaced with 
  // polling the server for models
  await new Promise(resolve => setTimeout(resolve, 1000))


  for (let i=0; i<10; i++){
    const randomRotation = rotateChoices[Math.floor(Math.random() * rotateChoices.length)];
    html = html + cardHtml.replace("rand-rotate1", randomRotation)
  }

  return html;
}

async function _fillModelContainer(){
  showLoader()

  const html = await _getFromServer();

  hideLoader()

  modelContainer.innerHTML = html;
}

// function for when the user hits the bottom of screen
globalThis.addEventListener("scroll", () => {
  const scrollTop = globalThis.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - 10;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight) {
    _addToModelContainer()
  }
});


async function _addToModelContainer(){
  showLoader()

  const html = await _getFromServer();

  hideLoader()

  modelContainer.innerHTML += html;
}


// function to get query params
function getQueryParams(){
  const params = new URLSearchParams(globalThis.location.search);
  return {
    mode: params.get('mode'),
    term: params.get('term'),
    removeNav: params.get('removeNav'),
  };
}

document.addEventListener('DOMContentLoaded', ()=>{
  const queryDetails = document.getElementById("queryDetails");
  const nav = document.querySelector("nav");

  console.log("Search loaded")
  const { mode, term, removeNav } = getQueryParams();
  
  // default:
  // mode = repos
  // term = null

  // TODO: Hook up the different types of search
  if (mode){
    queryDetails.innerText = `Searching: ${mode}`
    cardHtml = userCardHtml;
  } else {
    cardHtml = modelCardHtml;
  }

  if (term){
    queryDetails.innerText += `, specifically: ${term}`
  }

  if (removeNav){
    nav.remove();
  }

  console.log(`mode: ${mode}, term: ${term}, removeNav: ${removeNav}`)
})