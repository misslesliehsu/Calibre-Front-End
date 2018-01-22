// fetch all media objects
// fetch the user
// fetch all media_id's associated with this user? (playlist)
// for this items, load as playlist
// for the rest, load as library
// fetch & load the comments of #1 on playlist


document.addEventListener('DOMContentLoaded', () => {

  // document.querySelector('#play')
  // .addEventListener('click', (event) => {
  //   document.querySelectorAll('.container').forEach(container => {
  //     container.style.display = 'none'
  //   })
  //   document.querySelector('.media-container').style.display = 'grid'
  // })
  //
  // document.querySelector('#browse')
  // .addEventListener('click', (event) => {
  //   document.querySelectorAll('.container').forEach(container => {
  //     container.style.display = 'none'
  //   })
  //   document.querySelector('.browse-container').style.display = 'grid'
  // })
  //
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

  const searchBar = document.querySelector('#search-bar')
  const recommend = document.querySelector('#recommendations')
  const search = document.querySelector('#search')

// add event listener to searchbar
  let input = ""
  searchBar.addEventListener('keyup', (event) => {
    input = searchBar.value
    handleSearchBar()
  })

//handle searchbar functionality
  function handleSearchBar() {
    search.innerHTML = ""
    start = allSongs.filter(media => {
      return media.title.toLowerCase().startsWith(input.toLowerCase())
    })

    result = start.filter(media => {
      return media.title.toLowerCase().includes(input.toLowerCase())
    })

    for (const media of result) {
      if (input.length > 0) {
        createDiv(media, search);
      }
    }
  }

// creates a div for recommendations and search.
  function createDiv(media, parent) {

    let mDiv = document.createElement('div')
    mDiv.className = 'card'

    mDiv.append( document.createElement('p').innerHTML = media.title )
    mDiv.append( document.createElement('p').innerHTML = `Source: ${media.filesource}` )

    addButton = document.createElement('button')
    addButton.innerText = '+'
    addButton.className = 'rButton'
    addButton.addEventListener('click', (event) => {
      console.log('++');
    })

    playButton = document.createElement('button')
    playButton.innerText = '►'
    playButton.className = 'rButton'
    playButton.addEventListener('click', (event) => {
      Playlist.play(media)
    })

    mDiv.append(addButton, playButton)
    parent.append(mDiv)
  }

  for (var i = 0; i < 5; i++) {
    createDiv(allSongs[Math.floor(Math.random() * 5)], recommend)
  }

})

let allSongs = [
  {type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"},
  {type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"},
  {type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"},
  {type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"},
  {type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"},
  {type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"},
  {type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"},
  {type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"},
  {type: "video", title: "DEVELOPERS ", artist: "Microsoft guy", likes: 3, filesource: "Media/video.mp4"},
  {type: "video", title: "Android Wireless Earbuds ", artist: "Tech guy", likes: 1, filesource: "Media/hd.mp4"},
  {type: "audio", title: "Pokemon R Song ", artist: "Pokemon people", likes: 0, filesource: "Media/pokemonr.mp3"}
]
