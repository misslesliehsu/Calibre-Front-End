class Comment {
  constructor({id, content, media_id, content_id}) {
    this.id = id
    this.content = content
    this.media_id = media_id
    this.content_id = content_id
  }

  templateComment() {
    let commentsArea = document.getElementById('comments')
    let commentLi = document.createElement('li')
    commentLi.innerText = this.content
    let deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'delete'
    commentLi.appendChild(deleteButton)
    return commentLi

    // commentsArea.appendChild(commentLi)

    // deleteButton.addEventListener("click", ()=> {
    //   commentLi.remove()
    //   // fetch(`URL${this.id}`, {
    //   //         method: 'DELETE',
    //   //         headers: {
    //   //              'Content-Type': 'application/json',
    //   //              'Accept': 'application/json'
    //   //          }
    //   //        })
    // })
  }
}
