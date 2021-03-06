class App {
  static init() {
  //capture important HTML elements, as App attributes
    App.getElements()
  //instantiate an empty playlist & establish as current playlist; instance will be updated upon login
    App.playlist = new Playlist([])

  //Fetch all media; instantiate each and to store
  //then load all recommendations to recBar
    Adapter.getMedia().then(data => {
      data.forEach(media => {
        let current = new Medium(media)
        store.media.push(current)
      })
    }).then(() => {
      App.recommendations.appendChild(Medium.templateRecommendation())
      App.renderBrowse()
      App.renderGrid()
    })
  //Add event listeners
    App.handleMediaClick();
    App.handleClicks()
    App.handleLikeButton();
    App.handleLogin();
    App.handleCommentSubmit();
    App.handleCommentDelete();
    App.handleSearch()
    App.handleRepeat()
    App.handlePrevButton()
    App.handleNextButton()
    App.handleShuffleButton()
  }

  static getElements() {
    App.viewButton = document.querySelector('#viewButton')
    App.video = document.querySelector('#player video')
    App.audio = document.querySelector('#player audio')
    App.grid = document.querySelector('.grid')
    App.browse = document.querySelector('.browse')
    App.playlistArea = document.querySelector('#playlist')
    App.searchBar = document.querySelector('#search-bar')
    App.searchResult = document.querySelector('#search-results')
    App.moreMedia = document.querySelector('#more-media')
    App.likeButton = document.getElementById('like_button')
    App.likes = document.getElementById('likes')
    App.loginForm = document.getElementById("login-form")
    App.repeatButton = document.getElementById("repeat")
    App.video = document.querySelector('video')
    App.audio = document.querySelector('audio')
    App.recommendations = document.querySelector('#recommendations')
    App.prevButton = document.querySelector('#prev')
    App.nextButton = document.querySelector('#next')
    App.playerButton = document.querySelector('#playerButton')
    App.browseButton = document.querySelector('#browseButton')
    App.shuffleButton = document.querySelector("#shuffle")

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
      let clicked_id = parseInt(event.target.parentNode.dataset.media_id)


      //handle click on "play"
      if (event.target.className === "playButton") {
        // look for anything in the playlist area already highlighted
        let curr_high = document.querySelector('div[data-highlight = "true"]')
        if (curr_high){
          curr_high.setAttribute("data-highlight", "false")
        }


        //if this is a playlist item....
        if (event.target.parentElement.parentElement.parentElement.id === "playlist") {
          App.playlist.running = true
          App.playlist.start(clicked_id)
          event.target.parentElement.parentElement.dataset.highlight = "true"
        }
        //if this is a non-playlist item (e.g. from library or recs)
        else {
          App.playlist.running = false
          Medium.play(clicked_id)
        }

      }

      //handle click on "add to playlist"
      else if (event.target.className === "addButton") {
        //add id to the playlist array
        App.playlist.addItem(clicked_id)
        //append to the playlist area
        App.playlistArea.append(Playlist.templatePlaylistItem(clicked_id))
        //IF there is a current user, fetch POST to add this playlist item
        if (currentUser) {
          Adapter.postPlaylist("noname", currentUser.id, clicked_id).then(res=>{res.id})
        }
        //now, remove "add to playlist" button to all instances of the item (i.e. in recs or library)
        App.recommendations.innerHTML = ''
        App.recommendations.appendChild(Medium.templateRecommendation())
        if (App.browse.style.display === "grid") {App.renderBrowse()}



      }

      //handle click on "remove from playlist"
      else if (event.target.className === "playlistRemove") {
      //remove id from playlist array
      App.playlist.removeItem(clicked_id)
      //remove from the playlist area
      let for_removal = App.playlistArea.querySelector(`div[data-media_id = "${clicked_id}"`)
      for_removal.remove()
      if (currentUser) {Adapter.deletePlaylist(currentUser.id, clicked_id)}
      }

      else if (event.target.id === "prev") {

      }


    })
  }


  static handleClicks() {
    document.addEventListener('click', event => {
      let targetClass = event.target.className
      let targetParentId = parseInt(event.target.parentNode.parentNode.dataset.media_id)
      let targetIndex = App.playlist.media_ids.indexOf(targetParentId)

      if (targetClass === "fa fa-angle-double-up") {
        if (targetIndex !== 0) {
          let prev = App.playlist.media_ids[targetIndex-1]
          let prevDiv = document.querySelector(`div[data-media_id="${prev}"]`)

          App.playlist.media_ids[targetIndex] = prev
          App.playlist.media_ids[targetIndex-1] = targetParentId

          document.querySelector(`div[data-media_id="${targetParentId}"]`).remove()
          App.playlistArea.insertBefore(Playlist.templatePlaylistItem(targetParentId), prevDiv)
        }
      } else if (targetClass === "fa fa-angle-double-down") {
        if (targetIndex !== App.playlist.media_ids.length-1) {
          let next = App.playlist.media_ids[targetIndex+1]
          let nextDiv = document.querySelector(`div[data-media_id="${next}"]`)

          App.playlist.media_ids[targetIndex] = next
          App.playlist.media_ids[targetIndex+1] = targetParentId

          document.querySelector(`div[data-media_id="${targetParentId}"]`).remove()
          App.playlistArea.insertBefore(Playlist.templatePlaylistItem(targetParentId), nextDiv.nextSibling)
        }
      }
    })
  }


  static handleLikeButton(){
    App.likeButton.addEventListener("click", likeClicked)

    function likeClicked () {
      App.likes.innerHTML = parseInt(App.likes.innerHTML, 10) + 1
      let currentMedia = document.querySelector('#player').getAttribute('media-id')
      Adapter.putLikes(currentMedia,parseInt(App.likes.innerHTML))
    }
  }

  static handleLogin() {
    App.loginForm.addEventListener('submit', userLogin)

    function userLogin(e){
      e.preventDefault()
      let formInput = document.getElementById("username-input").value
      if (formInput !== ""){
        //find or create a new user
        if (User.getCurrentUser() === null){
          Adapter.findOrCreateUser(formInput).then(data => {
            // Add username to the dom.
            document.getElementById('displayUsername').innerText = `Welcome ${formInput}`
            let user = new User(data)
            User.setCurrentUser(user) // sets 'current user'
            App.playlistArea.innerHTML = ''
            Adapter.returnPlaylist(user.id)
            .then(data => {
              data.forEach(media => {
                App.playlistArea.append(Playlist.templatePlaylistItem(media.id))
                App.playlist.addItem(media.id)
                App.recommendations.innerHTML = ''
                App.recommendations.appendChild(Medium.templateRecommendation())
              })
            })
          })
        }
        //hide login
        let loginForm = document.getElementById('login-form')
        loginForm.style.display = 'none'
      }
    }
  }

  static handleSearch() {
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
    App.video.src = ""
    App.audio.src = ""
    App.viewButton.src = "browseOn.png"

  for (var i = 0; i < store.media.length; i++) {
    App.browse.append(store.media[i].templateSearchItem())
  }
    App.browse.style.display = 'grid'
  }

  static renderGrid() {

    App.browse.style.display = 'none'
    App.grid.style.display = 'grid'
    App.viewButton.src = 'playerOn.png'
  }


  static handleRepeat(){
    App.repeatButton.addEventListener('click', e => {
      App.audio.loop = !App.audio.loop
      App.video.loop = !App.video.loop

      if (App.audio.loop) {
        App.repeatButton.innerHTML = "Stop Repeat"
      } else {
        App.repeatButton.innerHTML = "Repeat"
      }
    })
  }


  static handleCommentSubmit(){
    let commentForm = document.getElementById('commentInput')
    commentForm.addEventListener('submit', commentSubmit)

    function commentSubmit(e){
      e.preventDefault()
      if (User.getCurrentUser() !== null) {
        let commentInput = document.getElementById('commentSubmit')
        let currentMediaId = document.getElementById('player').getAttribute('media-id')
        if (commentInput.value !== ''){
          // post a new comment
          Adapter.postComment(commentInput.value, User.getCurrentUser().id, parseInt(currentMediaId)).then( (res) =>{
            let newComment = new Comment(res)
            let commentsDiv = document.getElementById('comments')
            commentsDiv.append(newComment.templateComment())
          })
        }
      } else {
        alert('Cannot add comment without login.')
      }
      //reset value
      commentInput.value = ''
    }
  }

  static handleCommentDelete(){
    let commentsDiv = document.getElementById('comments')
    commentsDiv.addEventListener('click', commentDelete)

    function commentDelete(e){
      //event propagation
      if (e.target.className === 'delete' && User.getCurrentUser() !== null && e.target.parentNode.dataset['userId'] == User.getCurrentUser().id){
        //delete comment node
        let commentId = parseInt(e.target.parentNode.dataset['commentId'])
        e.target.parentNode.remove()
        // remove comment
        Adapter.deleteComment(commentId)

      } else if(e.target.className ==='delete') {
        alert('You can only delete your own comments')
      }
        e.stopPropagation()
    }
  }

  static handlePrevButton() {
    App.prevButton.addEventListener('click', (e) => {
      // e.stopPropagation()
      let parentId = parseInt(App.video.parentNode.getAttribute("media-id"))
      let parentMedia = App.playlist.media_ids.indexOf(parentId)
      let targetMedia = App.playlist.media_ids[parentMedia-1]
      let targetButton = App.playlistArea.querySelector(`div[data-media_id="${targetMedia}"] button[class="playButton"]`)


      if (targetButton === undefined) {
        return null
      } else {
        targetButton.click()
      }

    })
  }

  static handleNextButton() {
    App.nextButton.addEventListener('click', () => {
      let parentId = parseInt(App.video.parentNode.getAttribute("media-id"))
      let parentMedia = App.playlist.media_ids.indexOf(parentId)
      let targetMedia = App.playlist.media_ids[parentMedia+1]
      let targetButton = App.playlistArea.querySelector(`div[data-media_id="${targetMedia}"] button[class="playButton"]`)

      if (targetButton === undefined) return null
      targetButton.click()
    })
  }

  static handleShuffleButton() {
    App.shuffleButton.addEventListener("click", e => {
      e.stopPropagation()
      if (App.playlist.media_ids.length !== 0 ) {
        App.playlist.media_ids.sort(function(a,b) {return a * Math.random() - b * Math.random()})
        App.playlistArea.innerHTML = ''
        App.playlist.media_ids.forEach(media_id => {App.playlistArea.append(Playlist.templatePlaylistItem(media_id))})
      }
    })
  }
}
