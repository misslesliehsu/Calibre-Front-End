const Adapter = (function(){
  const BASE_URL = `http://localhost:3000/api/v1/`

    return class Adapter {

    static getPlaylists(){
      return fetch(`${BASE_URL}playlists`)
      .then( res => res.json())
    }

    static getComments(){
      return fetch(`${BASE_URL}comments`)
      .then(res => res.json())
    }

    static getMedia(){
      fetch(`${BASE_URL}media`)
      .then(res => res.json())
    }

    static postPlaylist(name, user_id, medium_id){
      return fetch(`${BASE_URL}playlists/`, {
        method: post,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          playlist:{
            name: name,
            user_id: user_id,
            medium_id: medium:id
          }
        })
      }).then(res => res.json())
    }

    static postComment(content, user_id, medium_id){
      return fetch(`${BASE_URL}comments/`, {
        method: post,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment:{
            content: content,
            user_id: user_id,
            medium_id: medium:id
          }
        })
      }).then(res => res.json())
    }

  }
}
