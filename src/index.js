const store = {media: []}

document.addEventListener('DOMContentLoaded', () => {
  App.init()

  document.querySelector('#mp')
  .addEventListener('click', () => {
    document.querySelector('.grid').style.display = 'none'
  })

  document.querySelector('#br')
  .addEventListener('click', () => {
    document.querySelector('.grid').style.display = 'none'
  })


})
