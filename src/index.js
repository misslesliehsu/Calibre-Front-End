// fetch all media objects
// fetch the user
// fetch all media_id's associated with this user? (playlist)
// for this items, load as playlist
// for the rest, load as library
// fetch & load the comments of #1 on playlist

document.addEventListener('DOMContentLoaded', () => {

  let likeButton = document.getElementById('like_button')
  likeButton.addEventListener("click", likeClicked)

  function likeClicked () {
    //increase the number on the page currently
    //THEN (optimistic) patch fetch for this image
    let likeTag = document.getElementById('likes')
    let newLikeCount = parseInt(likeTag.innerHTML, 10) + 1
    likeTag.innerHTML = newLikeCount
  }

document.querySelector('#more-media')
    .addEventListener('click', event => {
      if (event.target.className === "playButton") {
        media = allSongs.find(a => { return a.id === parseInt(event.target.parentNode.id) })
        Playlist.play(media)
      } else if (event.target.className === "addButton") {
        // Add to Playlist
      }
    })

  const searchBar = document.querySelector('#search-bar')
  searchBar.addEventListener('keyup', (event) => {
    input = searchBar.value;
    if (input.length > 0) {

      handleSearch(input).forEach(media => {
        document.querySelector('#search').append((new Medium(media).templateSearchItem()))
      })
    }
  })

  function handleSearch(input) {
    document.querySelector('#search').innerHTML = ""

    return allSongs
      .filter( media => {return media.title.toLowerCase().startsWith(input.toLowerCase())} )
      .filter( media => {return media.title.toLowerCase().startsWith(input.toLowerCase())} )
  }

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

//Used to act as a pseudo-database for videos.
//Pull media data from database --> get ids, get filesources etc
// Set IDs in your media.
