const store = {media: []}

document.addEventListener('DOMContentLoaded', () => {
  App.init()

  document.querySelector('#mp').addEventListener('click', App.renderGrid)
  document.querySelector('#br').addEventListener('click', App.renderBrowse)

  document.querySelector('#prev')
  .addEventListener('click', () => {
    parentId = parseInt(App.video.parentNode.getAttribute("media-id"))
    parentMedia = App.playlist.media_ids.indexOf(parentId)
    targetMedia = App.playlist.media_ids[parentMedia-1]
    targetButton = App.playlistArea.querySelector(`div[data-media_id="${targetMedia}"] button[class="playButton"]`)

    if (targetButton === undefined) return null
    App.playlistArea.querySelector(`div[data-media_id="${targetMedia}"] button[class="playButton"]`).click()
  })

  document.querySelector('#next')
  .addEventListener('click', () => {
    parentId = parseInt(App.video.parentNode.getAttribute("media-id"))
    parentMedia = App.playlist.media_ids.indexOf(parentId)
    targetMedia = App.playlist.media_ids[parentMedia+1]
    targetButton = App.playlistArea.querySelector(`div[data-media_id="${targetMedia}"] button[class="playButton"]`)

    if (targetButton === undefined) return null
    App.playlistArea.querySelector(`div[data-media_id="${targetMedia}"] button[class="playButton"]`).click()
  })
})
