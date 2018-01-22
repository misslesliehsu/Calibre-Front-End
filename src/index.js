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
  // document.querySelector('#playlist')
  // .addEventListener('click', (event) => {
  //   div = document.querySelector('#video')
  //   Playlist.newStart(div, videos1)
  // })


  let likeButton = document.getElementById('like_button')
  likeButton.addEventListener("click", likeClicked)

  function likeClicked () {
    //increase the number on the page currently
    //THEN (optimistic) patch fetch for this image
    let likeTag = document.getElementById('likes')
    let newLikeCount = parseInt(likeTag.innerHTML, 10) + 1
    likeTag.innerHTML = newLikeCount
  }

})



let videos1 = [
  {source: "pokemonr.mp3", type: "audio", name: "Pokemon R Battle Theme"},
  {source: "video.mp4", type: "video", name: "Developers Developers Developers"},
  {source: "pokemonx.mp3", type: "audio", name: "Pokemon X Battle Theme"},
  {source: "hd.mp4", type: "video", name: "Android Wireless Earbud"}
]
