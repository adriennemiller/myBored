class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.items = data.items;
    User.all.push(this);
  }

  static findById(id) {
    return this.all.find(user => user.id === id);
  }
}

User.all = [];
