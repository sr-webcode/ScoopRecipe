
class RecordTemplate {
  constructor() {
    this.domCache();
    this.recordLookup = this.recordLookup.bind(this);
    this.showPatchTemplate = this.showPatchTemplate.bind(this);
    this.basicTemplate = this.basicTemplate.bind(this);
    this.ingredientsTemplate = this.ingredientsTemplate.bind(this);
    this.stepsTemplate = this.stepsTemplate.bind(this);
    this.dataFragmenter = this.dataFragmenter.bind(this);
    this.classMarker = this.classMarker.bind(this);
    this.clearTemplateData = this.clearTemplateData.bind(this);
    this.showNewTemplate = this.showNewTemplate.bind(this);
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

  showPatchTemplate(data) {
    this.clearTemplateData();
    this.basicTemplate(data);
    this.ingredientsTemplate(data);
    this.stepsTemplate(data);
  }

  basicTemplate(objData) {

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

    titleField.placeholder = "title or name of recipe...";
    descField.placeholder = "brief description about the recipe...";
    prepField.value = 0;
    cookField.value = 0;
    servingsField.value = 0;


    if (this.existingRecord) {
      const { title, description, prepTime, cookTime, servings } = objData;
      titleField.value = title;
      descField.value = description;
      prepField.value = prepTime;
      cookField.value = cookTime;
      servingsField.value = servings;
    }

    titleLabel.textContent = "Title";
    descLabel.textContent = "Description";
    prepLabel.textContent = "Preparation (min)";
    cookLabel.textContent = "Cook Time (min)";
    servingsLabel.textContent = "Servings (amount)";

    //add class to each nested elem inside row
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

    //append all data to fragmenter
    const data = this.dataFragmenter(fields);
    this.recordInitView.appendChild(data);
  }

  ingredientsTemplate(data) {

    const ingHeaderGroup = document.createElement("ul"),
      ingHeader1 = document.createElement("li"),
      ingHeader2 = document.createElement("li"),
      ingHeader3 = document.createElement("li"),
      ingredientMasterContainer = document.createElement("ul"),
      addRowsBtn = document.createElement('span'),
      delRowsBtn = document.createElement('span');


    //add classes
    ingHeaderGroup.classList.add("record-temp-header");
    ingredientMasterContainer.classList.add("record-temp-master");
    addRowsBtn.classList.add('template-rows-btn');
    delRowsBtn.classList.add('template-rows-btn');


    if (this.existingRecord) {

      //iterate through ingredient list if existing record
      const ingredientListing = data.ingredients;

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

    } else {

      const inputList = document.createElement("li"),
        inputText = document.createElement("input"),
        inputAmt = document.createElement("input"),
        inputMeasure = document.createElement("input");

      inputText.setAttribute("type", "text");
      inputAmt.setAttribute("type", "number");
      inputMeasure.setAttribute("type", "text");
      inputText.setAttribute("name", "name");
      inputAmt.setAttribute("name", "amount");
      inputMeasure.setAttribute("name", "measurement");


      inputText.placeholder = "ingredient name...";
      inputAmt.value = 0;
      inputMeasure.placeholder = "ingredient measure...";


      [inputText, inputAmt, inputMeasure].forEach(child => {
        child.classList.add("record-temp-field");
        inputList.appendChild(child);
      });
      ingredientMasterContainer.appendChild(inputList);
    }

    //set table headers and other data
    ingHeader1.textContent = "Name";
    ingHeader2.textContent = "Amount";
    ingHeader3.textContent = "Measure";
    addRowsBtn.textContent = "new row";
    delRowsBtn.textContent = "delete row";
    addRowsBtn.setAttribute('data-role', 'newrow');
    delRowsBtn.setAttribute('data-role', 'delrow');


    //initial append for header
    [ingHeader1, ingHeader2, ingHeader3].forEach(child => {
      ingHeaderGroup.appendChild(child);
    });


    //fragment level append
    const masterFragment = this.dataFragmenter(
      this.existingRecord ?
        [
          ingHeaderGroup,
          ingredientMasterContainer,
        ] :
        [
          ingHeaderGroup,
          ingredientMasterContainer,
          addRowsBtn,
          delRowsBtn
        ]
    );

    this.recordIngView.appendChild(masterFragment);
  }

  stepsTemplate(objData) {


    const directionsMaster = document.createElement("ul"),
      dirHeaderGroup = document.createElement("ul"),
      dirHeader1 = document.createElement("li"),
      dirHeader2 = document.createElement("li"),
      addRowsBtn = document.createElement('span'),
      delRowsBtn = document.createElement('span');


    if (this.existingRecord) {

      //iterate through each direction

      const { directions } = objData;
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
        insText.setAttribute("name", "instructions");
        insOptional.setAttribute("name", "optional");


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

      const currentList = this.dataFragmenter(directionData);
      directionsMaster.appendChild(currentList);

    } else {

      const insList = document.createElement("li"),
        insText = document.createElement("input"),
        insOptional = document.createElement("select"),
        isTrue = document.createElement("option"),
        isFalse = document.createElement("option");


      insText.classList.add("record-temp-field");
      insOptional.classList.add("record-temp-field");

      insText.setAttribute("type", "text");
      insText.setAttribute("name", "instructions");
      insOptional.setAttribute("name", "optional");

      isTrue.textContent = "true";
      isFalse.textContent = "false";

      [isTrue, isFalse].forEach(elem => {
        insOptional.appendChild(elem);
      });


      insText.placeholder = "type specific instructions...."
      insOptional.selectedIndex = 1;

      [insText, insOptional].forEach(elem => {
        insList.appendChild(elem);
      });

      directionsMaster.appendChild(insList);
    }

    //set base styles
    directionsMaster.classList.add("record-temp-master");
    dirHeaderGroup.classList.add("record-temp-header");
    addRowsBtn.classList.add('template-rows-btn');
    delRowsBtn.classList.add('template-rows-btn');

    //set data
    dirHeader1.textContent = "Instructions";
    dirHeader2.textContent = "Optional";
    addRowsBtn.textContent = "new row"
    delRowsBtn.textContent = "delete row"
    addRowsBtn.setAttribute('data-role', 'newrow');
    delRowsBtn.setAttribute('data-role', 'delrow');


    //base append for header
    const headerItems = this.dataFragmenter([dirHeader1, dirHeader2]);
    dirHeaderGroup.appendChild(headerItems);

    //master data
    const masterData = this.dataFragmenter(
      this.existingRecord ?
        [dirHeaderGroup, directionsMaster]
        : [dirHeaderGroup, directionsMaster, addRowsBtn, delRowsBtn]
    );
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

  showNewTemplate() {
    this.clearTemplateData();
    this.basicTemplate();
    this.ingredientsTemplate();
    this.stepsTemplate();
    this.recordInitView.style.setProperty("display", "block");
  }

  hide() {
    this.recordTemp.style.setProperty("display", "none");
  }

  show(uuid, action) {
    this.action = action;
    this.recordTemp.style.setProperty("display", "block");
    switch (action.toLowerCase()) {
      case "post":
        this.existingRecord = false;
        this.showNewTemplate();
        break;
      case "patch":
        this.existingRecord = true;
        this.recordLookup(uuid);
        break;
      default:
        console.log(`something went wrong`);
        break;
    }
  }

}

export default RecordTemplate;
