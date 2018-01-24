const store = {media: []}

document.addEventListener('DOMContentLoaded', () => {
  App.init()

  document.querySelector('#mp').addEventListener('click', App.renderGrid)
  document.querySelector('#br').addEventListener('click', App.renderBrowse)
})
