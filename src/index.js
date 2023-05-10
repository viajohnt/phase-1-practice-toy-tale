let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
.then (response => response.json())
.then (data => data.forEach(createCard))

function createCard (object) {
  const toyCard = document.createElement("div");
  const toyImg = document.createElement("img");
  const toyName = document.createElement("h2");
  const toyLikes = document.createElement("p");
  const toyBtn  = document.createElement("button")
  const toyZone = document.getElementById("toy-collection")


  toyBtn.innerHTML = "like"
  toyName.textContent = object.name
  toyImg.src = object.image
  toyLikes.textContent = object.likes + " Likes"
  toyImg.className = "toy-avatar"
  toyCard.className = "card"
  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImg) 
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(toyBtn)
  toyZone.appendChild(toyCard)

  toyBtn.addEventListener('click', () => {
    fetch(`http://localhost:3000/toys/${object.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: object.likes + 1
      })  
    })
    .then(response => response.json())
    .then(data => {
      toyLikes.textContent = data.likes + " Likes"
      object.likes = data.likes
    })
  })

}

const createToy = document.querySelector(".add-toy-form")
createToy.addEventListener("submit", (event) => {
  event.preventDefault()
  toyName.textContent = event.name
  toyImg.src = event.image
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(data => createCard(data))
})


  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


