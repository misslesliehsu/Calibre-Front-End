
class Medium {
  constructor( {id, kind, title, artist, likes, filesource} ){
    this.id = id
    this.kind = kind
    this.title = title
    this.artist = artist
    this.like_count = likes
    this.file_src = filesource
  }

  templateMain(){
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

  //RETURNS A FULL DIV OF RECOMMENDATIONS
  static templateRecommendation(){
    //how to make this sort pass through only?
    let sorted = store.media.sort((a,b) => {b.like_count - a.like_count})
    let recs = sorted.slice(0,4)
    let recBar = document.createElement('div')
    recBar.className = "recBar"
    recs.forEach( rec => {
      let mediaDiv = document.createElement('div')
      mediaDiv.className = 'card'
      mediaDiv.dataset.media_id = rec.id
      mediaDiv.innerHTML = `
      <p>${rec.title}</p>
      <p>${rec.file_src}</p>
      <button class="addButton">+</button>
      <button class="playButton">►</button>
      `
      recBar.appendChild(mediaDiv)
    })
    return recBar
    //now in index can say document.getElementById("recommendations").appendChild(Medium.templateRecommendation)
  }

  renderAsLibraryItem(){
    //will be similar as above, but to different parts of the HTML
  }

   play() {
    let video = document.querySelector('video')
    let audio = document.querySelector('audio')
    let player = document.getElementById('player')
    player.setAttribute("media-id", this.id)
    video.src = ""
    audio.src = ""

    switch (this.kind) {
      case "video":
        audio.style.display = "none"
        video.style.display = "inline"
        video.width = video.parentNode.clientWidth
        video.src = this.file_src
        break;
      case "audio":
        video.style.display = "none"
        audio.style.display = "inline"
        audio.width = audio.parentNode.clientWidth
        audio.src = this.file_src
        break;
    }
      Adapter.getMedium(this.id)
      .then( res => {
        //show likes
        let likes = document.getElementById('likes')
        likes.innerText = res.likes
    })
    // add comments
  }

  templateSearchItem() {
    let mediaDiv = document.createElement('div')
    mediaDiv.className = 'card'
    mediaDiv.dataset.media_id = this.id

    mediaDiv.innerHTML = `
    <p>${this.title}</p>
    <p>${this.artist}</p>
    <button class="addButton">+</button>
    <button class="playButton">►</button>
    `
    return mediaDiv
  }

}
