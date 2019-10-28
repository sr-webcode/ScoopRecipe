class SiteEvent {
  trigger() {
    return {
      siteNavEvents: (e) => {
        console.log(e.target)
      }
    }
  }
}


export default SiteEvent