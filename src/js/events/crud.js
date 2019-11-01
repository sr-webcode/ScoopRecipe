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
    console.log(request);
    // fetch(request)
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(res => {
    //     this.recipeManage.show();
    //     this.recipeTemplate.hide();
    //     console.log('query ok!')
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  specifyRequest() {
    let uri;

    //attach id if delete or patch request
    const isDelPatch = ["delete", "patch"].indexOf(this.event) > -1;
    const isAddPatch = ["post", "patch"].indexOf(this.event) > -1;

    switch (this.category) {
      case "recipes":
        uri = `http://localhost:3001/recipes/${isDelPatch && this.id}`;
        break;
      case "specials":
        uri = `http://localhost:3001/specials/${isDelPatch && this.id}`;
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
      body: isAddPatch ? this.defineRequestBody() : ""
    });

    return dbRequest;
  }

  defineRequestBody() {
    //gather data first
    const data = this.gatherData();
    // return data;
  }

  gatherData() {
    const basicPanelItems = document.querySelectorAll(
      'div[data-temp-role="init"] > .record-temp-field'
    );

    const ingPanelItems = document.querySelectorAll(
      'div[data-temp-role="ing"] > .record-temp-master > li'
    );

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
        amount: nestedRows[1].amount,
        measurement: nestedRows[2].measurement
      };
    });

    console.log(ingData);

    // return JSON.stringify(basicData);
  }
}

export default DatabaseEvents;
