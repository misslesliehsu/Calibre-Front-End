let currentUser = null;
class User {
    constructor({id, username, theme}) {
      this.id = id
      this.username = username
      this.theme = theme
    }

     static setCurrentUser(user){
      return currentUser = user
    }

     static removeCurrentUser(){
      return currentUser = null
    }
     static getCurrentUser(){
      return currentUser
    }
  }
