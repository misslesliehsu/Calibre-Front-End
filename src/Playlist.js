class Playlist {

  constructor(media_ids) {
    this.media_ids = media_ids
  }

//with above, a new Playlist is instantiated as just an array of media_ids, referring to a subset of media items that should all be instantiated themselves

//Note - there should only be ONE Playlist instance living at a time, since there is only one user, and one playlist/user


  //RETURNS A FULL PLAYLIST DIV
  templateFullPlaylist () {
  //this creates a bunch of div's inside a main div
    let playlistDivs = createElement('div')
    this.forEach( id => {
    playlistDivs.appendChild(templatePlaylistItem(id))
    return playlistDivs
    //then, in index.js, can say playlistArea.appendChild(playlistDivs)
    })
  }

  //BOTH below functions should be called to ADD AN ITEM to a playlist

  //ADDS ITEM TO PLAYLIST ARRAY
  addItem (id) {
    this.media_ids.push(id)
    //THEN adjust the buttons for this item within the library
  }

  //RETURNS AN INDIVIDUAL PLAYLIST DIV
  static templatePlaylistItem (id) {
    let mediaItem = store.media.find((x) => x.id === id)
    let playlistItem = document.createElement('div')
    playlistItem.dataset.media_id = mediaItem.id
    playlistItem.innerHTML = `
      <div class='playlist-main' data-media_id="${id}">
        test text
        ${mediaItem.title} + "by " + ${mediaItem.artist}
        <button class="playButton">Play Now</button>
        <button class="playlistRemove">X</button>
      </div>
      <div class="playlist-order">
        <i class="fa fa-angle-double-up" style="font-size:24px;color:gray"></i>
        <i class="fa fa-angle-double-down" style="font-size:24px;color:gray"></i>
      </div>
      `
    return playlistItem
  }


  //REMOVES ITEM FROM PLAYLIST ARRAY
  removeItem(id) {
    this.media_ids.splice( this.indexOf(id), 1 );
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
