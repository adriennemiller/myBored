const addBtn = document.getElementById('new-button')
const addForm = document.querySelector('.itemForm')
const list = document.querySelector('.item-list')
const login = document.getElementById('loginDiv')
const username = document.getElementById('username')
const cancel = document.getElementById('cancel-btn')

//
login.addEventListener('submit', (e) => {
  e.preventDefault();
  let div = document.getElementById("mainContent");
  div.classList.remove("hide");
  let user = username.value
  addUser(user);
  document.getElementById('loginDiv').style.display = "none";
  document.querySelector('.login-logo').style.display = "none";

})


function addUser(user){
  fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
       "Accept": "application/json"
    },
    body: JSON.stringify({
      username: user
    })
  })
  .then(resp => resp.json()).then(data => {

    const user = (new User(data))
    const userId = user.id
    let url = `http://localhost:3000/api/v1/users/${userId}`
    makeItems(url);
  })

}




    const app = new App();
    app.attachEventListeners();



function makeItems(url) {
    fetch(url).then(res => res.json()).then(data => {
      let pics = data.items
      pics.forEach(pic => {
        if (pic.user_id === User.all[0].id){
        let appendItem = (new Item(pic)).renderListItem();
        list.appendChild(appendItem)
        dragElement(appendItem)} else {
          console.log("nothing yet!")
        }
      });
    });
}

  addBtn.addEventListener('click', () => {
    addForm.style.display = 'block'
    onNew();
    addForm.addEventListener('submit', createItem)
    cancel.addEventListener('click', () => {
      addForm.style.display = 'none'
      offNew();
    })
  });

  function createItem(e) {
  e.preventDefault();
  addForm.style.display = 'none'
  offNew();
  let inputs = document.querySelectorAll(".user-input");

  let title = inputs[0].value
  let category = inputs[1].value
  let link = inputs[2].value
  let image = inputs[3].value
  let id = User.all[0].id

  let info = {
    title: title,
    category: category,
    url: link,
    image: image,
    user_id: id
  }

  fetch("http://localhost:3000/api/v1/items", {
    method: "POST",
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(info)
  }).then(res => res.json()).then(data =>{
    console.log(data)
    let appendItem = (new Item(data)).renderListItem();
    list.appendChild(appendItem)
    dragElement(appendItem)
  })
}

function onUpdate() {
  document.getElementById("overlay-update").style.display = "block";
}

function offUpdate() {
  document.getElementById("overlay-update").style.display = "none";
}

function onNew() {
  document.getElementById("overlay-new").style.display = "block";
}

function offNew() {
  document.getElementById("overlay-new").style.display = "none";
}
