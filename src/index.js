const store = {media: {}}

document.addEventListener('DOMContentLoaded', () => {
  App.init()


  let likeButton = document.getElementById('like_button')
  likeButton.addEventListener("click", likeClicked)

  function likeClicked () {
    let likeTag = document.getElementById('likes')
    let newLikeCount = parseInt(likeTag.innerHTML, 10) + 1
    likeTag.innerHTML = newLikeCount
  }


  document.querySelector('#search-results')
  .addEventListener('click', event => {
    if (event.target.className === "playButton") {
      Playlist.play(store.media[event.target.parentNode.id])
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


})
