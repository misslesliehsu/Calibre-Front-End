class App {
  static init() {
    App.searchBar = document.querySelector('#search-bar')
    App.searchResult = document.querySelector('#search-results')
    const recommendations = document.querySelector('#recommendations')

    Adapter.getMedia().then(data => {
      data.forEach(media => {
        let current = new Medium(media)
        store.media.push(current)
      })
      }).then( () => {
        recommendations.appendChild(Medium.templateRecommendation())
      })

  }
}
