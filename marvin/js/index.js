document.addEventListener('DOMContentLoaded', () => {



  document.querySelector('#play')
  .addEventListener('click', (event) => {
    document.querySelectorAll('.container').forEach(container => {
      container.style.display = 'none'
    })
    document.querySelector('.media-container').style.display = 'grid'
  })

  document.querySelector('#browse')
  .addEventListener('click', (event) => {
    document.querySelectorAll('.container').forEach(container => {
      container.style.display = 'none'
    })
    document.querySelector('.browse-container').style.display = 'grid'
  })

  document.querySelector('#playlist')
  .addEventListener('click', (event) => {
    div = document.querySelector('#video')
    Playlist.newStart(div, videos4)
  })


})




let videos1 = [
  "video.mp4",
  "wallet.mp4",
  "texas.mp4",
  "hd.mp4"
]

let videos2 = [
  "video.mp4",
  "wallet.mp4"
]

let videos3 = [
  "texas.mp4",
  "hd.mp4"
]

let videos4 = [
  {source: "zanna.mp3", type: "audio", name: "Pokemon Omega Ruby Zanna Battle Theme"},
  {source: "video.mp4", type: "video", name: "Developers Developers Developers"},
  {source: "pokemonx.mp3", type: "audio", name: "Pokemon X/Y Lysander Battle Theme"},
  {source: "hd.mp4", type: "video", name: "Android Wireless Earbud"}
]
