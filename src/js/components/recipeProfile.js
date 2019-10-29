
class RecipeProfile {
  constructor(id) {
    this.id = id;

    this.domCache();
  }

  requestProfile() {

  }

  domCache() {
    this.recipeProfile = document.querySelector('.recipe-profile');
    this.recipeProfileContainer = document.querySelector('.recipe-profile > .container')
  }


  init() {
    console.log(`profle page was called`)
  }

  show() {

    this.recipeProfile.style.setProperty('display', 'block')
    this.init();
  }

  hide() {
    this.recipeProfile.style.setProperty('display', 'none')
  }

}

export default RecipeProfile