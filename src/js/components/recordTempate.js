///this is where we interchanged add and edit records!

class RecordTemplate {
  constructor() {
    this.domCache();
    this.recordLookup = this.recordLookup.bind(this);
    this.showPatchTemplate = this.showPatchTemplate.bind(this);
    this.showPostTemplate = this.showPatchTemplate.bind(this);
    this.extractBasic = this.extractBasic.bind(this);
    this.extractIngredients = this.extractIngredients.bind(this);
    this.extractSteps = this.extractSteps.bind(this);
    this.dataFragmenter = this.dataFragmenter.bind(this);
    this.classMarker = this.classMarker.bind(this);
    this.clearTemplateData = this.clearTemplateData.bind(this);
  }

  init() {
    this.hide();
  }

  domCache() {
    this.recordTemp = document.querySelector(".record-template");
    this.recordTempWrapper = document.querySelector(".record-template-wrapper");

    this.recordInitView = document.querySelector('div[data-temp-role="init"]');
    this.recordIngView = document.querySelector('div[data-temp-role="ing"]');
    this.recordStepView = document.querySelector('div[data-temp-role="steps"]');
  }

  //request speicific data based on uuid
  recordLookup(id) {
    const uri = `http://localhost:3001/recipes/${id}`,
      request = new Request(uri, {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });

    fetch(request)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.showPatchTemplate(data);
        this.recordInitView.style.setProperty("display", "block");
      })
      .catch(err => {
        console.log(err);
      });
  }

  showPostTemplate() {
    console.log(`adding bro!`);
  }

  showPatchTemplate(data) {
    this.clearTemplateData();
    this.extractBasic(data);
    this.extractIngredients(data);
    this.extractSteps(data);
  }

  extractBasic({ title, description, prepTime, cookTime, servings }) {
    const titleField = document.createElement("input"),
      descField = document.createElement("textarea"),
      prepField = document.createElement("input"),
      cookField = document.createElement("input"),
      servingsField = document.createElement("input"),
      titleLabel = document.createElement("label"),
      descLabel = document.createElement("label"),
      prepLabel = document.createElement("label"),
      cookLabel = document.createElement("label"),
      servingsLabel = document.createElement("label");

    titleField.setAttribute("type", "text");
    prepField.setAttribute("type", "number");
    cookField.setAttribute("type", "number");
    servingsField.setAttribute("type", "number");

    titleLabel.setAttribute("data-type", "label");
    descLabel.setAttribute("data-type", "label");
    prepLabel.setAttribute("data-type", "label");
    cookLabel.setAttribute("data-type", "label");
    servingsLabel.setAttribute("data-type", "label");

    titleField.setAttribute("name", "title");
    descField.setAttribute("name", "description");
    prepField.setAttribute("name", "prepTime");
    cookField.setAttribute("name", "cookTime");
    servingsField.setAttribute("name", "servings");

    titleField.value = title;
    descField.value = description;
    prepField.value = prepTime;
    cookField.value = cookTime;
    servingsField.value = servings;

    titleLabel.textContent = "Title";
    descLabel.textContent = "Description";
    prepLabel.textContent = "Preparation (min)";
    cookLabel.textContent = "Cook Time (min)";
    servingsLabel.textContent = "Servings (amount)";

    //add class
    const fields = [
      titleLabel,
      titleField,
      descLabel,
      descField,
      prepLabel,
      prepField,
      cookLabel,
      cookField,
      servingsLabel,
      servingsField
    ];

    this.classMarker(fields);
    //append to fragmenter
    const data = this.dataFragmenter(fields);
    this.recordInitView.appendChild(data);
  }

  extractIngredients(data) {

    const ingredientListing = data.ingredients,
      ingHeaderGroup = document.createElement("ul"),
      ingHeader1 = document.createElement("li"),
      ingHeader2 = document.createElement("li"),
      ingHeader3 = document.createElement("li"),
      ingredientMasterContainer = document.createElement("ul");

    //iterate through ingredient list
    const ingTree = ingredientListing.map(each => {
      const inputList = document.createElement("li"),
        inputText = document.createElement("input"),
        inputAmt = document.createElement("input"),
        inputMeasure = document.createElement("input");

      //set data type
      inputList.setAttribute("uuid", each.uuid);
      inputText.setAttribute("type", "text");
      inputAmt.setAttribute("type", "number");
      inputMeasure.setAttribute("type", "text");
      inputText.setAttribute("name", "name");
      inputAmt.setAttribute("name", "amount");
      inputMeasure.setAttribute("name", "measurement");

      //set val
      inputText.value = each.name;
      inputAmt.value = each.amount || "-";
      inputMeasure.value = each.measurement || "-";

      [inputText, inputAmt, inputMeasure].forEach(child => {
        child.classList.add("record-temp-field");
        inputList.appendChild(child);
      });

      return inputList;
    });

    //initial append for data rows
    const initList = this.dataFragmenter(ingTree);
    ingredientMasterContainer.appendChild(initList);

    //set table headers
    ingHeader1.textContent = "Name";
    ingHeader2.textContent = "Amount";
    ingHeader3.textContent = "Measure";

    //initial append for header
    [ingHeader1, ingHeader2, ingHeader3].forEach(child => {
      ingHeaderGroup.appendChild(child);
    });

    //base classes
    ingHeaderGroup.classList.add("record-temp-header");
    ingredientMasterContainer.classList.add("record-temp-master");

    //fragment level append
    const masterFragment = this.dataFragmenter([
      ingHeaderGroup,
      ingredientMasterContainer
    ]);

    this.recordIngView.appendChild(masterFragment);
  }

  extractSteps({ directions }) {
    const directionsMaster = document.createElement("ul"),
      dirHeaderGroup = document.createElement("ul"),
      dirHeader1 = document.createElement("li"),
      dirHeader2 = document.createElement("li");

    //iterate through each direction
    const directionData = directions.map(each => {
      const insList = document.createElement("li"),
        insText = document.createElement("input"),
        insOptional = document.createElement("select"),
        isTrue = document.createElement("option"),
        isFalse = document.createElement("option");

      //set classnames

      insText.classList.add("record-temp-field");
      insOptional.classList.add("record-temp-field");

      //set types
      insText.setAttribute("type", "text");
    

      //append data
      isTrue.textContent = "true";
      isFalse.textContent = "false";
      
      insText.value = each.instructions;

      [isTrue, isFalse].forEach(elem => {
        insOptional.appendChild(elem);
      });

      const shouldSelect = String(each.optional);
      insOptional.selectedIndex = shouldSelect === "true" ? 0 : 1;

      [insText, insOptional].forEach(elem => {
        insList.appendChild(elem);
      });

      return insList;

    });

    //set base styles
    directionsMaster.classList.add("record-temp-master");
    dirHeaderGroup.classList.add("record-temp-header");

    //set data
    dirHeader1.textContent = "Instructions";
    dirHeader2.textContent = "Optional";

    //base append for header
    const headerItems = this.dataFragmenter([dirHeader1, dirHeader2]);
    dirHeaderGroup.appendChild(headerItems);

    //append to master container
    const currentList = this.dataFragmenter(directionData);
    directionsMaster.appendChild(currentList);

    //master data
    const masterData = this.dataFragmenter([dirHeaderGroup, directionsMaster]);

    this.recordStepView.appendChild(masterData);
  }

  classMarker(fields) {
    fields.forEach(input => {
      const isLabel = input.getAttribute("data-type");
      if (isLabel) return input.classList.add("record-temp-label");
      input.classList.add("record-temp-field");
    });
  }

  dataFragmenter(data) {
    const docuFrag = document.createDocumentFragment();
    data.forEach(child => {
      docuFrag.appendChild(child);
    });
    return docuFrag;
  }

  clearTemplateData() {
    this.recordInitView.innerHTML = "";
    this.recordIngView.innerHTML = "";
    this.recordStepView.innerHTML = "";
  }

  hide() {
    this.recordTemp.style.setProperty("display", "none");
  }

  show(uuid = false, action) {
    this.action = action;
    this.recordTemp.style.setProperty("display", "block");
    switch (action) {
      case "post":
        this.showPostTemplate();
        break;
      case "patch":
        this.recordLookup(uuid);
        break;
      default:
        console.log(`something went wrong`);
        break;
    }
  }
}

export default RecordTemplate;
