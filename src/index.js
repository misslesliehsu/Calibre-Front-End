//FIRST - LOAD THE DB DATA

      // fetch all media objects
      // fetch the user
      // fetch all media_id's associated with this user? (playlist)
      // for this items, load as playlist
      // for the rest, load as library
      // fetch & load the comments of #1 on playlist

//
//
// fetch(URL/medium) //to get all songs
//   .then(res => res.json())
//   .then(res => loadMedia(res), addListeners())
//
//
//   function loadMedia(res) {
//     let media = new Media(res.id, res.url, res.name, res.like_count, res.comments)
//     image.render()
//   }
//
//   function imageLoaded() {
//     //event listener for likes
//     let likeButton = document.getElementById('like_button')
//     likeButton.addEventListener("click", likeClicked)
//
//     //event listener for new comment
//     let submitButton = document.getElementById('comment_submit')
//     submitButton.addEventListener("click", commentSubmitted)
//   }
//
//
//EVENT LISTENER CALLBACK FUNCTIONS/////////////////
  //
  // function likeClicked () {
  //   //increase the number on the page currently
  //   //THEN (optimistic) patch fetch for this image
  //   let likeTag = document.getElementById('likes')
  //   let newLikeCount = parseInt(likeTag.innerHTML, 10) + 1
  //   likeTag.innerHTML = newLikeCount

  // fetch(likeURL, {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Accept': 'application/json'
  //             },
  //             body: JSON.stringify({
  //               image_id: imageId
  //             })
  //           })
}

// function commentSubmitted() {
//   //add + render comment & clear form
//   //POST
//   let contentInput = document.getElementById('comment_input').value
//
//   let newComment = new Comment(null, contentInput)
//   newComment.render()
//   document.getElementById('comment_input').value = ""
//
//
//   fetch(commentsURL, {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Accept': 'application/json'
//               },
//               body: JSON.stringify({
//                 image_id: imageId,
//                 content: contentInput
//               })
//             })
//
//
// }
