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

})

let allSongs = [
  {id: 0, type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", like_count: 3, filesource: "Media/video.mp4"},
  {id: 1, type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", like_count: 1, filesource: "Media/hd.mp4"},
  {id: 2, type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", like_count: 0, filesource: "Media/pokemonr.mp3"},
  {id: 3, type: "video", title: "Spongebob Wallet ", artist: "Cartoon people", like_count: 3, filesource: "Media/wallet.mp4"},
  {id: 4, type: "audio", title: "Pokemon X Song ", artist: "Pokemon people", like_count: 1, filesource: "Media/pokemonx.mp3"},
  {id: 5, type: "video", title: "Spogebob Texas ", artist: "Cartoon people", like_count: 0, filesource: "Media/texas.mp4"}
]

for (var i = 0; i < allSongs.length; i++) {
  new Medium(allSongs[i])
}
