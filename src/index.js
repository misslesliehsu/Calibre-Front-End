// fetch all media objects
// fetch the user
// fetch all media_id's associated with this user? (playlist)
// for this items, load as playlist
// for the rest, load as library
// fetch & load the comments of #1 on playlist


document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('#playlist-button')
  .addEventListener('click', (event) => {
    div = document.querySelector('#player')
    Playlist.start(div, videos1)
  })


  // let likeButton = document.getElementById('like_button')
  // likeButton.addEventListener("click", likeClicked)
  //
  // function likeClicked () {
  //   //increase the number on the page currently
  //   //THEN (optimistic) patch fetch for this image
  //   let likeTag = document.getElementById('likes')
  //   let newLikeCount = parseInt(likeTag.innerHTML, 10) + 1
  //   likeTag.innerHTML = newLikeCount
  // }


document.querySelector('#more-media')
    .addEventListener('click', event => {
      if (event.target.className === "playButton") {
        media = allSongs.find(a => { return a.id === parseInt(event.target.parentNode.id) })
        Playlist.play(media)
      } else if (event.target.className === "addButton") {
        // Add to Playlist
      }
    })

  searchBar.addEventListener('keyup', (event) => {
    input = searchBar.value;
    handleSearch();
  })

  function handleSearch(input) {
    document.querySelector('#search').innerHTML = ""
    const searchBar = document.querySelector('#search-bar')

    return allSongs
      .filter( media => {return media.title.toLowerCase().startsWith(input.toLowerCase())} )
      .filter( media => {return media.title.toLowerCase().startsWith(input.toLowerCase())} )
  }



let allSongs = [
  {id: 0, type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {id: 1, type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {id: 2, type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"},
  {id: 3, type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {id: 4, type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {id: 5, type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"},
  {id: 6, type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {id: 7, type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {id: 8, type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"},
  {id: 9, type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"}
]
