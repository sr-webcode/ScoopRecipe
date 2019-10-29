import currentData from '../../../server/data.json'

class RecipeManage {

  constructor() {

    this.domCache()

  }

  init() {

  }

  domCache() {
    this.recipeSpecial = document.querySelector('.recipe-manage')
    this.recipeSpecialContainer = document.querySelector('.recipe-manage > .container')
  }

  hide() {
    this.recipeSpecial.style.setProperty('display', 'none')
  }

  show() {
    this.recipeSpecial.style.setProperty('display', 'block')
  }

}

export default RecipeManage;