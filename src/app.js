class App {
  static init() {
  //capture important HTML elements, as App attributes
    App.getElements()


  //Fetch all media; instantiate each and to store
  //then load all recommendations to recBar
    Adapter.getMedia().then(data => {
      data.forEach(media => {
        let current = new Medium(media)
        store.media.push(current)
      })
    }).then(() => {
      recommendations.appendChild(Medium.templateRecommendation())
    })
  //Add event listeners
    App.handleSearchBar();
    App.handleMediaClick();
    App.handleLikeButton();
    App.handleLogin();

  //instantiate an empty playlist & establish as current playlist; instance will be updated upon login
    App.playlist = new Playlist([])
  }

  static getElements() {
    App.playlistArea = document.querySelector('#playlist')
    App.searchBar = document.querySelector('#search-bar')
    App.searchResult = document.querySelector('#search-results')
    App.moreMedia = document.querySelector('#more-media')
    App.likeButton = document.getElementById('like_button')
    App.likes = document.getElementById('likes')
    App.loginForm = document.getElementById("login-form")
    // App.loginInput = document.getElementById("username-input").value
    const recommendations = document.querySelector('#recommendations')
  }

  static handleSearchBar(){
    App.searchBar.addEventListener('keyup', event => {
      App.searchResult.innerHTML = ""
      let input = App.searchBar.value.toLowerCase();

      if (input.length > 0) {
        for (const media in store.media) {
          if (store.media[media].title.toLowerCase().includes(input)) {
            App.searchResult.append(store.media[media].templateSearchItem())
          } // if store media
        } // for const
      } // if input
    }) // event listener
  } // static handle

  static handleMediaClick(){
    document.addEventListener('click', event => {
      //lookup the media object that was clicked on
      let parent_id = parseInt(event.target.parentNode.dataset.media_id)
      let sel_item = store.media.find(x => {return x.id === parent_id})

      //handle click on "play"
      if (event.target.className === "playButton") {
        sel_item.play()
      }
      //handle click on "add to playlist"
      else if (event.target.className === "addButton") {
        //add id to the playlist array
        App.playlist.addItem(parent_id)
        //append to the playlist area
        App.playlistArea.append(Playlist.templatePlaylistItem(parent_id))
        //IF there is a current user, fetch POST to add this playlist item
        if (currentUser) {
          Adapter.postPlaylist("noname", currentUser.id, parent_id)
        }
      }
    })
  }

  static handleLikeButton(){
    App.likeButton.addEventListener("click", likeClicked)

    function likeClicked () {
      App.likes.innerHTML = parseInt(App.likes.innerHTML, 10) + 1
    }
  }

  static handleLogin() {
    App.loginForm.addEventListener('submit', userLogin)

    function userLogin(e){
      e.preventDefault()
      let formInput = document.getElementById("username-input").value
      if (formInput !== ""){
        //find or create a new user
        Adapter.findOrCreateUser(formInput).then(data => {
          // Add username to the dom.
          document.getElementById('displayUsername').innerText = `Welcome ${formInput}`
          let user = new User(data)
          User.setCurrentUser(user) // sets 'current user'

          Adapter.returnPlaylist(user.id)
          .then(data => {
            data.forEach(media => {
              App.playlistArea.append(Playlist.templatePlaylistItem(media.id))
              App.playlist.addItem(media.id)
            })
          })

        })


      }
    }

  }


}
