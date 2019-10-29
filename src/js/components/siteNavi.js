import SiteEvent from "../controller/events";

class SiteNaviActions {
  constructor() {
    this.events = new SiteEvent();
  }

  init() {
    this.domCache();
    this.assignEvents();
  }

  domCache() {
    this.naviButtons = document.querySelectorAll(".site-nav-act");
  }

  assignEvents() {
    this.naviButtons.forEach(btn => {
      btn.addEventListener("click", this.events.trigger().siteNavEvents);
    });
  }
}

export default SiteNaviActions;
