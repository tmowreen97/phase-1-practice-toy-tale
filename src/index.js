let addToy = false;
let toyCollection = document.getElementById('toy-collection')
let submitButton = document.querySelector('.submit')
let inputValue = document.querySelector('.input-text')

document.addEventListener("DOMContentLoaded", () => {
  addToToyCollection()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toyFormContainer.addEventListener('submit', function(event){
    event.preventDefault()
    createPOST(event.target.name.value, event.target.image.value)
  })
  //code begins
  //add toy info
  


});

//Functions
function addToToyCollection(){
  return (fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(function(event){
    event.map(toy => createDiv(toy))


    })
  )
}

function createDiv(toy){
  let toyCard = document.createElement('div')
  toyCard.className="card"
  toyCollection.append(toyCard)
  toyCard.innerHTML=`<h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id="${toy.id}">Like ❤️</button>`
}

function createPOST(name, url){
  fetch("http://localhost:3000/toys", {
  method: "POST",
  headers:
    {
      "Content-Type":"application/json",
      Accept: "application/json"
    },
  body: JSON.stringify({
    "name": name,
    "image": url,
    "likes": 0
  })
})
.then(res => res.json())
.then(function(event){
  createDiv(event)
})
}

  