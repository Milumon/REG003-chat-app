class User {
  constructor(userId, name, password) {
    this.userId = userId;
    this.name = name;
    this.password = password;
  }

  getUserId() {
    return this.userId;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }
}

module.exports = User;
// const miUsuario = new User('Ro');
// miUsuario.sayMyName();
