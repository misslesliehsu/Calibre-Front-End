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
    Playlist.newStart(div, videos1)
  })

})



let videos1 = [
  {source: "pokemonr.mp3", type: "audio", name: "Pokemon R Battle Theme"},
  {source: "video.mp4", type: "video", name: "Developers Developers Developers"},
  {source: "pokemonx.mp3", type: "audio", name: "Pokemon X Battle Theme"},
  {source: "hd.mp4", type: "video", name: "Android Wireless Earbud"}
]
