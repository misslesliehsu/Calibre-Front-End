class Image {

  constructor(id, type, title, artist, like_count, file_src){
    this.id = id
    this.type = type
    this.title = title
    this.artist = artist
    this.like_count = like_count
    this.file_src = file_src
  }

  renderAsMain(){
    //render source of media
    let playerTag = document.getElementById('player')
    playerTag.src = this.file_src

    //render caption below
    let caption = document.getElementById('title-artist')
    nameTag.innerHTML = this.title + "by " + this.artist

    //render likes
    //note - when a song is selected as "main", need to do a fetch for its Comments
    let likeTag = document.getElementById('likes')
    likeTag.innerHTML = this.like_count
  }


  //note - songs will either come out as being in the Library, Playlist (mutually exclusive) and ALSO possibly Main
  templatePlaylistItem(){
    //will be similar as above, but to different parts of the HTML
    //should have button to remove from playlist
    //also buttons to move up & down

    let playlistArea = document.getElementById('playlist')
    let playlistItem = document.createElement('div')
    playlistItem.id = this.id
    playlistItem.innerHTML = `
      <div class='playlist-main'>
        test text
        ${this.title} + "by " + ${this.artist}
        <button class="playlistPlayNow">Play Now</button>
        <button class="playlistRemove">X</button>
      </div>
      <div class="playlist-order">
        <i class="fa fa-angle-double-up" style="font-size:24px;color:gray"></i>
        <i class="fa fa-angle-double-down" style="font-size:24px;color:gray"></i>
      </div>
      `
    return playlistItem
  }



  renderAsLibraryItem(){
    //will be similar as above, but to different parts of the HTML
  }

}
