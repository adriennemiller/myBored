const addBtn = document.getElementById('new-button')
const addForm = document.querySelector('.itemForm')
const list = document.querySelector('.item-list')
let addItem = false;

// on load, renders items currently saved

    const app = new App();
    app.attachEventListeners();

    makeItems();

// make into function
function makeItems() {
    app.adapter.fetchItems().then(json => {
      json.forEach(item => {
        let appendItem = (new Item(item)).renderListItem();
        list.appendChild(appendItem)
        dragElement(appendItem)
      });
    });
}

  addBtn.addEventListener('click', () => {
    addItem = !addItem
    if (addItem) {addForm.style.display = 'block'
      addForm.addEventListener('submit', createItem)
    } else {
      addForm.style.display = 'none'
    }
  });

  function createItem(e) {
  e.preventDefault();
  let inputs = document.querySelectorAll(".input-text");

  let title = inputs[0].value
  let category = inputs[1].value
  let link = inputs[2].value
  let image = inputs[3].value

  let info = {
    title: title,
    category: category,
    url: link,
    image: image
  }

  fetch("http://localhost:3000/api/v1/items", {
    method: "POST",
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(info)
  }).then(res => res.json()).then(data =>{
    let appendItem = (new Item(data)).renderListItem();
    list.appendChild(appendItem)
    dragElement(appendItem)
  })



}
