import RecipeManage from "../components/recipeManage";
import RecipeTemplate from "../components/recordTempate";

class DatabaseEvents {
  constructor() {
    this.recipeManage = new RecipeManage();
    this.serverRequest = this.serverRequest.bind(this);
    this.specifyRequest = this.specifyRequest.bind(this);
    this.defineRequestBody = this.defineRequestBody.bind(this);
    this.gatherData = this.gatherData.bind(this);
    this.recipeTemplate = new RecipeTemplate();
  }

  init(event, id, category) {
    this.event = event;
    this.id = id;
    this.category = category;
    if (!this.event || !this.id) return;
    this.serverRequest();
  }

  serverRequest() {

    const request = this.specifyRequest();

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.recipeManage.show();
        this.recipeTemplate.hide();
        console.log('query ok!')
      })
      .catch(err => {
        console.log(err);
      });

  }

  specifyRequest() {

    let uri;


    switch (this.category) {

      case "recipes":

        uri = this.event === "delete" || this.event === "patch" ?
          `http://localhost:3001/recipes/${this.id}` : `http://localhost:3001/recipes`;

        break;

      case "specials":
        uri = this.event === "delete" || this.event === "patch" ?
          `http://localhost:3001/specials/${isDelPatch && this.id}` : `http://localhost:3001/specials`;

        break;

      default:
        return false;

    }

    const dbRequest = new Request(uri, {
      method: this.event.toUpperCase(),
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: ["post", "patch"].indexOf(this.event) > -1 ? this.defineRequestBody() : ""
    });

    return dbRequest;
  }

  defineRequestBody() {

    const data = this.gatherData();

    //determine if patch or add event
    switch (this.event) {
      case "post":
        //insert tempImage
        const newData = Object.assign({}, data, {
          images: {
            full: "/img/temp.jpg",
            medium: "/img/temp_medium.jpg",
            small: "/img/temp_small.jpg"
          }
        })
        return JSON.stringify(newData)
      case "patch":

        return JSON.stringify(data);
      default:
        console.log(`something went wrong`)
    }

  }

  gatherData() {

    const basicPanelItems = document.querySelectorAll(
      'div[data-temp-role="init"] > .record-temp-field'
    );

    const ingPanelItems = document.querySelectorAll(
      'div[data-temp-role="ing"] > .record-temp-master > li'
    );

    const stepsPanelItems = document.querySelectorAll('div[data-temp-role="steps"] > .record-temp-master > li');


    //basic data
    const basicData = Array.from(basicPanelItems)
      .map(each => {
        return {
          param: each.getAttribute("name"),
          value: each.type === "number" ? parseInt(each.value) : each.value
        };
      })
      .reduce((accum, data) => {
        if (!accum.hasOwnProperty(data.param)) {
          accum[data.param] = data.value;
        }
        return accum;
      }, {});

    //ingredients nested data
    const ingData = Array.from(ingPanelItems).map(each => {
      const nestedRows = Array.from(
        each.querySelectorAll(".record-temp-field")
      ).map(item => {
        return {
          [item.name]: item.value
        };
      });

      return {
        uuid: each.getAttribute("uuid"),
        name: nestedRows[0].name,
        amount: parseFloat(nestedRows[1].amount),
        measurement: nestedRows[2].measurement
      };
    });

    //steps data
    const stepsData = Array.from(stepsPanelItems).map((each) => {
      const nestedRows = Array.from(each.querySelectorAll('.record-temp-field')).map((data) => {
        return {
          [data.name]: data.value
        }
      });
      return {
        instructions: nestedRows[0].instructions,
        optional: nestedRows[1].optional === "false" ? false : true
      }
    })


    const overAllData = Object.assign({}, basicData, { ingredients: [...ingData], directions: [...stepsData] })

    return overAllData;

  }

}

export default DatabaseEvents;
