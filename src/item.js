class Item {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.category = data.category;
    this.image = data.image;
    this.url = data.url;
    Item.all.push(this);
  }

  update(data) {
    this.id = data.id;
    this.title = data.title;
    this.category = data.category;
    this.image = data.image;
    this.url = data.url;
  }

  renderListItem() {
    let item = document.createElement('div')
    item.classList.add('item-list')
    item.classList.add('draggable')
    // add a button?
    // item.classList.add('item-card')
    // let button = document.createElement("button")
    // button.textContent = "Edit"
    item.id = this.id

    let img = document.createElement('img')
    img.src = this.image
    img.alt = 'image'


    item.appendChild(img)
    return item;
}

  rerender(){
    let div = document.getElementById(this.id)
    div.firstElementChild.src = this.image
  }

  deleteItem(){
    let div = document.getElementById(this.id)

    fetch(`http://localhost:3000/api/v1/items/${this.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      body: JSON.stringify({
        "title": this.title,
        "url": this.url,
        "image": this.image,
        "category": this.category,
        "id": this.id
      }),
    }).then(div.remove())
  }


  static findById(id) {
    return this.all.find(item => item.id === id);
  }

  renderUpdateForm() {
    return `
    <div id="overlay-update">
    <div id="updateFormBox">
    <form data-id=${this.id} id="uform">
      <h4>${this.title}</h4>
      <p>${this.category}</p>
      <a href="${this.url}">Visit URL of Current Item</a>
      <br>
      <br
      <p>_________________________</p>
      <h5>Edit Item:</h5>
      <label>Title</label>
      <p>
        <input type="text" id="title" class="form-control" value="${this.title}"/>
      </p>
      <label>Category</label>
      <p>
        <input type="text" id="category" class="form-control" value="${this.category}" />
      </p>
      <label>Item URL</label>
      <p>
        <input type="text" id="url" class="form-control" value="${this.url}" />
      </p>
      <label>Image Link</label>
      <p>
        <input id="image" class="form-control" type="text" value="${this.image}" />
      </p>
      <button type='submit' class= "btn btn-outline-info">Save Item</button>
      <button type='button' id='deleteButton' class="btn btn-outline-danger">Delete Item</button>
      <button type='button' id='cancelEdit' class="btn btn-outline-warning">Cancel</button>
    </form>
    </div>
    </div>
  `;
  }

  update({title, category, url, image}) {
   this.title = title;
   this.category = category;
   this.url = url;
   this.image = image;
 }
}

Item.all = [];
