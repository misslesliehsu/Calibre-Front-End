class Playlist {

  constructor() {

  }

  static start(div, playlist) {
    let video = div.children[0]
    let audio = div.children[1]
    let track = 0

    Playlist.play(playlist[track])

    audio.addEventListener('ended', (event) => {
      if (track+1 === playlist.length) return null
      track++
      Playlist.play(playlist[track])
    })

    video.addEventListener('ended', (event) => {
      if (track+1 === playlist.length) return null
      track++
      Playlist.play(playlist[track])
    })
  }

  static play(media) {
    let video = document.querySelector('video')
    let audio = document.querySelector('audio')
    video.src = ""
    audio.src = ""

    switch (media.kind) {
      case "video":
        audio.style.display = "none"
        video.style.display = "inline"
        video.width = video.parentNode.clientWidth
        video.src = media.file_src
        break;
      case "audio":
        video.style.display = "none"
        audio.style.display = "inline"
        audio.style.width = audio.parentNode.clientWidth
        audio.src = media.file_src
        break;
    }
  }

  static populate(playlist) {
    recommend = document.querySelector('recommend')
    playlist.forEach(media => {
      div = document.createElement('div')

      name = document.createElement('h3')
      name.innerText = media.name
    })
  }





}
