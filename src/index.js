const store = {media: []}

document.addEventListener('DOMContentLoaded', () => {
  App.init()


  let likeButton = document.getElementById('like_button')
  likeButton.addEventListener("click", likeClicked)

  function likeClicked () {
    let likeTag = document.getElementById('likes')
    let newLikeCount = parseInt(likeTag.innerHTML, 10) + 1
    likeTag.innerHTML = newLikeCount
  }

  document.querySelector('#more-media')
  .addEventListener('click', event => {
    let parent_id = parseInt(event.target.parentNode.dataset.media_id)
    let sel_item = store.media.find((x) => {return x.id === parent_id})
    if (event.target.className === "playButton") {
      Playlist.play(sel_item)
    }

    else if (event.target.className === "addButton") {
      //what needs to happen here:
        //add id to the playlist array
        //append to the playlist area
        //IF there is a current user, fetch POST to add this playlist item
    }

  })


  App.searchBar.addEventListener('keyup', event => {
    App.searchResult.innerHTML = ""
    input = App.searchBar.value.toLowerCase();

    if (input.length > 0) {
      for (const media in store.media) {
        if (store.media[media].title.toLowerCase().includes(input)) {
          App.searchResult.append(store.media[media].templateSearchItem())
        }
      }
    }
  })


  //handle login event
  const loginButton = document.getElementById("login-form")
  loginButton.addEventListener('submit', userLogin)

  function userLogin(e){
    e.preventDefault()
    let formInput = document.getElementById("username-input").value
    if (formInput !== ""){
      //find or create a new user
      let userInput = document.getElementById('username-input').value
      Adapter.findOrCreateUser(userInput).then( () => {
        // Add username to the dom.
        document.getElementById('displayUsername').innerText = `Welcome ${userInput}`
        User.setCurrentUser(userInput) // sets 'current user'
      })
    }
  }

})
