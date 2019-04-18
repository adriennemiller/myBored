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
    <form data-id=${this.id} id="uform">
      <label>Title</label>
      <p>
        <input type="text" id="title" value="${this.title}"/>
      </p>
      <label>Category</label>
      <p>
        <input type="text" id="category" value="${this.category}" />
      </p>
      <label>Link</label>
      <p>
        <input type="text" id="url" value="${this.url}" />
      </p>
      <label>Image URL</label>
      <p>
        <input id="image" type="text" value="${this.image}" />
      </p>
      <button type='submit'>Save Item</button><br><br>
      <button type='button' id='deleteButton'>Delete Item</button>
    </form>
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
