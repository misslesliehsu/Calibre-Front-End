class App {
  static init() {
    App.getElements()

    Adapter.getMedia().then(data => {
      data.forEach(media => {
        let current = new Medium(media)
        store.media.push(current)
      })
    }).then(() => {
      recommendations.appendChild(Medium.templateRecommendation())
    })

    App.handleSearchBar();
    App.handleMediaClick();
    App.handleLikeButton();
    App.handleLogin();
    App.handleNewSearch()


  }

  static getElements() {
    App.grid = document.querySelector('.grid')
    App.browse = document.querySelector('.browse')
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
    App.moreMedia.addEventListener('click', event => {
      let parent_id = parseInt(event.target.parentNode.dataset.media_id)
      let sel_item = store.media.find(x => {return x.id === parent_id})
      if (event.target.className === "playButton") {
        Playlist.play(sel_item)
      } else if (event.target.className === "addButton") {
        //what needs to happen here:
          //add id to the playlist array
          //append to the playlist area
          //IF there is a current user, fetch POST to add this playlist item
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
              document.querySelector('#playlist').append(Playlist.templatePlaylistItem(media.id))
            })
          })
        })
      }
    }
  }

  static handleNewSearch() {
    document.querySelector('.form').addEventListener('submit', e => {
      e.preventDefault()
      App.renderBrowse();
      document.querySelector('.browse').innerHTML = ""
      let input = App.searchBar.value.toLowerCase();

      if (input.length > 0) {
        for (const media in store.media) {
          if (store.media[media].title.toLowerCase().includes(input)) {
            document.querySelector('.browse').append(store.media[media].templateSearchItem())
          } // if store media
        } // for const
      } // if input
    })
  }

  static renderBrowse() {
    App.grid.style.display = 'none'
    App.browse.innerHTML = ''

    //6
    let array = []
    while (array.length < 5) {
      media = store.media[Math.floor(Math.random() * store.media.length)]
      if (!array.includes(media)) {
        array.push(media)
        document.querySelector('.browse').append(media.templateSearchItem())
      }
    }

    App.browse.style.display = 'grid'
  }

  static renderGrid() {
    App.browse.style.display = 'none'
    App.grid.style.display = 'grid'
  }


}
