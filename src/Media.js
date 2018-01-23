let allMedia = []

class Medium {
  constructor({id, type, title, artist, likes, filesource}){
    this.id = id
    this.type = type
    this.title = title
    this.artist = artist
    this.like_count = likes
    this.file_src = filesource
  }

  static all() {
    return allMedia
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
    let sorted = this.all.sort((a,b) => {b.like_count - a.like_count})
    recommendations = sorted.slice(0,4)
    let recBar = document.createElement('div')
    recBar.className = "recBar"
    recommendations.forEach( rec => {
      let mediaDiv = document.createElement('div')
      mediaDiv.className = 'card'
      mediaDiv.dataset.media_id = rec.id
      mediaDiv.innerHTML = `
      <p>${this.title}</p>
      <p>${this.file_src}</p>
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
    video.src = ""
    audio.src = ""

    switch (media.type) {
      case "video":
        audio.style.display = "none"
        video.style.display = "inline"
        video.width = video.parentNode.clientWidth
        video.src = this.filesource
        break;
      case "audio":
        video.style.display = "none"
        audio.style.display = "inline"
        audio.width = audio.parentNode.clientWidth
        audio.src = this.filesource
        break;
    }
  }


  templateSearchItem() {
    let mediaDiv = document.createElement('div')
    mediaDiv.className = 'card'
    mediaDiv.dataset.media_id = this.id

    mediaDiv.innerHTML = `
    <p>${this.title}</p>
    <p>${this.file_src}</p>
    <button class="addButton">+</button>
    <button class="playButton">►</button>
    `
    return mediaDiv
  }

}
