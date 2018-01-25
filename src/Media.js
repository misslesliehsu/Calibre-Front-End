
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
      //if this item is in the playlist, disable the addButton
      if(App.playlist.media_ids.includes(rec.id)) {
        mediaDiv.querySelector(".addButton").style.display = "none"
      }
      recBar.appendChild(mediaDiv)
    })
    return recBar
    //now in index can say document.getElementById("recommendations").appendChild(Medium.templateRecommendation)
  }

  static play(item_id) {
    
    let play_item = store.media.find(x => {return x.id === item_id})

    let player = document.getElementById('player')
    //
    player.setAttribute("media-id", item_id)
    App.video.src = ""
    App.audio.src = ""

    switch (play_item.kind) {
      case "video":
        App.audio.style.display = "none"
        App.video.style.display = "inline"
        App.video.width = App.video.parentNode.clientWidth
        App.video.src = play_item.file_src
        break;
      case "audio":
        App.video.style.display = "none"
        App.audio.style.display = "inline"
        App.audio.width = App.audio.parentNode.clientWidth
        App.audio.src = play_item.file_src
        break;
    }
      Adapter.getMedium(item_id)
      .then( res => {
        //show likes

        App.likes.innerText = res.likes
        // show comments
      })

      Adapter.getMediaComments(item_id)
      .then(res => {
        let commentsArea = document.getElementById('comments')
        for (let item in commentsArea.children){
          //remove existing comments
          if (commentsArea.children[item].className === 'media-comment'){
            commentsArea.children[item].remove()
          }
        }
        for (let com in res){
          let comment = new Comment(res[com])
          commentsArea.append(comment.templateComment())
        }
      })
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
    if(App.playlist.media_ids.includes(this.id)) {
      mediaDiv.querySelector(".addButton").style.display = "none"
    }
    return mediaDiv
  }

}
