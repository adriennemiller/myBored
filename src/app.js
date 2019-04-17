class App {

constructor() {
    this.adapter = new Adapter();
  }

  attachEventListeners() {
    document.querySelector('.item-list').addEventListener('dblclick', e => {
      const url = e.target.src
      const item = Item.findByPic(url)
      document.querySelector('#update').innerHTML = item.renderUpdateForm();
      });

       document.querySelector('#update').addEventListener('submit', e => {
       e.preventDefault();
       const id = parseInt(e.target.dataset.id);
       const item = Item.findById(id);
       const title = e.target.querySelector('#title').value;
       const category = e.target.querySelector('#category').value;
       const url = e.target.querySelector('#url').value;
       const image = e.target.querySelector('#image').value;
       const jsonBody = { title, category, url, image };
       this.adapter.updateItem(item.id, jsonBody, item)

       
       // render this list item



       let form = document.getElementById("uform")
       form.classList.add("js-is-hidden")
  });

}
  addItems() {
    document.querySelector('.item-list').innerHTML = '';
    Item.all.forEach(item => {
      item.renderListItem();
      let list = document.querySelector('.item-list')
      list.appendChild(item)
      dragElement(item)
    })
  }

  handleFormSubmit(e) {
    this.adapter.updateItem(item.id, bodyJSON).then(updatedItem => {
      const item = Item.findById(updatedItem.id);
      item.update(updatedItem);
      this.addItems();
    });
  }
}
