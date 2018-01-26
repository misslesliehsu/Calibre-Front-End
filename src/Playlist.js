class Playlist {

  constructor(media_ids) {
    this.media_ids = media_ids
    this.running = false
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
    playlistItem.className = "playlist-item"
    playlistItem.innerHTML = `
      <div class='playlist-main' data-media_id="${id}">
        ${mediaItem.title} <br> ${mediaItem.artist} <br>
        <button class="playButton">►</button>
        <button class="playlistRemove">X</button>
        <i class="fa fa-angle-double-up" style="font-size:24px;color:#6B6B6B"></i>
        <i class="fa fa-angle-double-down" style="font-size:24px;color:#6B6B6B"></i>
      </div>
      `
    return playlistItem
  }


  //REMOVES ITEM FROM PLAYLIST ARRAY
  removeItem(id) {
    this.media_ids.splice( this.media_ids.indexOf(id), 1 );
  }

//for playing playlist items (autoplay)
  start(starting_media_id) {

    Medium.play(starting_media_id)

    //get the playlist index the of the starting song
    let track_index = App.playlist.media_ids.indexOf(starting_media_id)
    console.log(starting_media_id)
    console.log(track_index)
    console.log(App.playlist.media_ids)

    App.audio.addEventListener('ended', (event) => {
      let playing_id = event.target.parentElement.getAttribute("media-id")
      let to_un_high = App.playlistArea.querySelector(`div[data-media_id = "${playing_id}"]`)
      to_un_high.dataset.highlight = "false"
      if (App.playlist.running === true) {
        if (track_index+1 === App.playlist.media_ids.length) return null
        track_index++
        Medium.play(App.playlist.media_ids[track_index])
        let to_high = App.playlistArea.querySelector(`div[data-media_id = "${App.playlist.media_ids[track_index]}"`)
        to_high.dataset.highlight = "true"

      }
    })

    App.video.addEventListener('ended', (event) => {

      let playing_id = event.target.parentElement.getAttribute("media-id")
      let to_un_high = App.playlistArea.querySelector(`div[data-media_id = "${playing_id}"]`)
      to_un_high.dataset.highlight = "false"
      if (App.playlist.running === true) {
        if (track_index+1 === App.playlist.media_ids.length) return null
        track_index++
        Medium.play(App.playlist.media_ids[track_index])
        let to_high = App.playlistArea.querySelector(`div[data-media_id = "${App.playlist.media_ids[track_index]}"`)
        to_high.dataset.highlight = "true"


      }
    })
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
