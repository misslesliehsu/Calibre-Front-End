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
  renderAsPlaylistItem(){
    //will be similar as above, but to different parts of the HTML
    //should have button to remove from playlist
  }

  renderAsLibraryItem(){
    //will be similar as above, but to different parts of the HTML
  }

}
