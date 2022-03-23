var persons;
var positions;
var orgs;
var subs;
var personsindex;
var positionsindex;
var orgsindex;
var subsindex;

function ageVerification(){
  let date = persons[personsindex-1]["birthday"].split(".");
  let age = Math.ceil(Math.abs(new Date().getTime() - new Date(date[2], date[1], date[0]).getTime()) / (1000 * 60 * 60 * 24 * 365));
  if ((age > positions[positionsindex-1]["max_age"])||(age < positions[positionsindex-1]["min_age"]))
    return true;
  else
    return false;
}

//Чтение массива persons
function readPersons(input) {
  let file = input.files[0];
  let reader = new FileReader();
  let result = "пусто";

  reader.readAsText(file);

  reader.onload = function() {
    persons = JSON.parse(reader.result).sort((a, b) => { return ((a["lastname"] + " "	+ a["middlename"]	+ " "	+ a["firstname"]) > (b["lastname"] + " "	+ b["middlename"]	+ " "	+ b["firstname"])) ? 1 : -1});
  };

  reader.onerror = function() {
    alert(reader.error);
  };
}
//Чтение массива positions
function readPositions(input) {
  let file = input.files[0];
  let reader = new FileReader();
  let result = "пусто";

  reader.readAsText(file);

  reader.onload = function() {
    positions = JSON.parse(reader.result).sort((a, b) => { return (a["name"] > b["name"]) ? 1 : -1});
  };

  reader.onerror = function() {
    alert(reader.error);
  };
}
//Чтение массива orgs
function readOrgs(input) {
  let file = input.files[0];
  let reader = new FileReader();
  let result = "пусто";

  reader.readAsText(file);

  reader.onload = function() {
    orgs = JSON.parse(reader.result).sort((a, b) => { return (a["name"] > b["name"]) ? 1 : -1});
  };

  reader.onerror = function() {
    alert(reader.error);
  };
}
//Чтение массива subs
function readSubs(input) {
  let file = input.files[0];
  let reader = new FileReader();
  let result = "пусто";

  reader.readAsText(file);

  reader.onload = function() {
    subs = JSON.parse(reader.result).sort((a, b) => { return (a["name"] > b["name"]) ? 1 : -1});
  };

  reader.onerror = function() {
    alert(reader.error);
  };
}

function update() {
  try {
    document.querySelector("#persondelbutton").remove();
    document.querySelector("#persontext").innerText = "пусто";
  }
  catch{

  }
  if (personsindex !== undefined){
    document.querySelector("#persontext").innerText = persons[personsindex-1]["lastname"] + " "	+ persons[personsindex-1]["middlename"]	+ " "	+ persons[personsindex-1]["firstname"];
    let button = document.createElement("button");
    button.innerText = "X";
    button.setAttribute("id", "persondelbutton")
    document.querySelector("#personmenu").appendChild(button);
    button.addEventListener("click", () => {
      button.remove();
      document.querySelector("#persontext").innerText = "пусто";
      personsindex = undefined;
    });
  }

  try {
    document.querySelector("#positiondelbutton").remove();
    document.querySelector("#positiontext").innerText = "пусто";
  }
  catch{

  }
  if (positionsindex !== undefined){
    document.querySelector("#positiontext").innerText = positions[positionsindex-1]["name"];
    let button = document.createElement("button");
    button.innerText = "X";
    button.setAttribute("id", "positiondelbutton")
    document.querySelector("#positionmenu").appendChild(button);
    button.addEventListener("click", () => {
      button.remove();
      document.querySelector("#positiontext").innerText = "пусто";
      positionsindex = undefined;
    });
  }

  try {
    document.querySelector("#orgdelbutton").remove();
    document.querySelector("#orgtext").innerText = "пусто";
  }
  catch{

  }
  if (orgsindex !== undefined){
    document.querySelector("#orgtext").innerText = orgs[orgsindex-1]["name"];
    let button = document.createElement("button");
    button.innerText = "X";
    button.setAttribute("id", "orgdelbutton")
    document.querySelector("#orgmenu").appendChild(button);
    button.addEventListener("click", () => {
      button.remove();
      document.querySelector("#orgtext").innerText = "пусто";
      orgsindex = undefined;
    });
  }

  try {
    document.querySelector("#subdelbutton").remove();
    document.querySelector("#subtext").innerText = "пусто";
  }
  catch{

  }
  if (subsindex !== undefined){
    document.querySelector("#subtext").innerText = subs[subsindex-1]["name"];
    let button = document.createElement("button");
    button.innerText = "X";
    button.setAttribute("id", "subdelbutton")
    document.querySelector("#submenu").appendChild(button);
    button.addEventListener("click", () => {
      button.remove();
      document.querySelector("#subtext").innerText = "пусто";
      subsindex = undefined;
    });
  }

}

//Модальное окно "СОТРУДНИК"
document.querySelector("#show-person-selection").addEventListener("click", () => {
  let table = document.createElement("table");
  let tabler = document.createElement("tr");
  table.appendChild(tabler);
  
  Object.keys(persons[0]).forEach((e) => {
    let tableh = document.createElement("th");
    tableh.innerText = e;
    tabler.appendChild(tableh);
  });
  persons.forEach((p) => {
    let tabler = document.createElement("tr");
    table.appendChild(tabler);
    tabler.addEventListener("click", () => {
      if (personsindex !== undefined)
        table.rows[personsindex].setAttribute("bgcolor", "white");
      tabler.setAttribute("bgcolor", "lightblue");  
      personsindex = tabler.rowIndex;
      if (positionsindex !== undefined){
        if (ageVerification())
            show_modal(name="Выбранный сотрудник не подходит по возрасту. Вы уверены, что хотите выбрать этого сотрудника?");

      }

    });
    Object.keys(p).forEach((k) => {
      let tabled = document.createElement("td");
      tabled.innerText = p[k];
      tabler.appendChild(tabled); 
    });
  });
  if (personsindex !== undefined)
    table.rows[personsindex].setAttribute("bgcolor", "lightblue");
  show_modal(name="Сотрудник", content=table);
});

//Модальное окно "ДОЛЖНОСТЬ"
document.querySelector("#show-position-selection").addEventListener("click", () => {
  let table = document.createElement("table");
  let tabler = document.createElement("tr");
  table.appendChild(tabler);
  
  Object.keys(positions[0]).forEach((e) => {
    let tableh = document.createElement("th");
    tableh.innerText = e;
    tabler.appendChild(tableh);
  });
  positions.forEach((p) => {
    let tabler = document.createElement("tr");
    table.appendChild(tabler);
    tabler.addEventListener("click", () => {
      if (positionsindex !== undefined)
        table.rows[positionsindex].setAttribute("bgcolor", "white");
      tabler.setAttribute("bgcolor", "lightblue");  
      
        positionsindex = tabler.rowIndex;
        if (personsindex !== undefined){
          if (ageVerification())
            show_modal(name="Выбранная должность не подходит по возрасту сотруднику. Вы уверены, что хотите выбрать эту должность?");
        }
    });
    Object.keys(p).forEach((k) => {
      let tabled = document.createElement("td");
      tabled.innerText = p[k];
      tabler.appendChild(tabled); 
    });
  });
  if (positionsindex !== undefined)
    table.rows[positionsindex].setAttribute("bgcolor", "lightblue");
  show_modal(name="Должность", content=table);
});

//Модальное окно "ОРГАНИЗАЦИЯ"
document.querySelector("#show-org-selection").addEventListener("click", () => {
  let table = document.createElement("table");
  let tabler = document.createElement("tr");
  table.appendChild(tabler);
  
  Object.keys(orgs[0]).forEach((e) => {
    let tableh = document.createElement("th");
    tableh.innerText = e;
    tabler.appendChild(tableh);
  });
  orgs.forEach((p) => {
    let tabler = document.createElement("tr");
    table.appendChild(tabler);
    tabler.addEventListener("click", () => {
      if (orgsindex !== undefined)
        table.rows[orgsindex].setAttribute("bgcolor", "white");
      tabler.setAttribute("bgcolor", "lightblue");  
      
        orgsindex = tabler.rowIndex;
    });
    Object.keys(p).forEach((k) => {
      let tabled = document.createElement("td");
      tabled.innerText = p[k];
      tabler.appendChild(tabled); 
    });
  });
  if (orgsindex !== undefined)
    table.rows[orgsindex].setAttribute("bgcolor", "lightblue");
  show_modal(name="Организация", content=table);
});

//Модальное окно "ПОДРАЗДЕЛЕНИЕ"
document.querySelector("#show-sub-selection").addEventListener("click", () => {
  let table = document.createElement("table");
  let tabler = document.createElement("tr");
  table.appendChild(tabler);
  
  Object.keys(subs[0]).forEach((e) => {
    let tableh = document.createElement("th");
    tableh.innerText = e;
    tabler.appendChild(tableh);
  });
  subs.forEach((p) => {
    let tabler = document.createElement("tr");
    table.appendChild(tabler);
    tabler.addEventListener("click", () => {
      if (subsindex !== undefined)
        table.rows[subsindex].setAttribute("bgcolor", "white");
      tabler.setAttribute("bgcolor", "lightblue");  
      
        subsindex = tabler.rowIndex;
    });
    Object.keys(p).forEach((k) => {
      let tabled = document.createElement("td");
      tabled.innerText = p[k];
      tabler.appendChild(tabled); 
    });
  });
  if (subsindex !== undefined)
    table.rows[subsindex].setAttribute("bgcolor", "lightblue");
  show_modal(name="Подразделение", content=table);
});


//Конструктор модального окна
function show_modal(name="Название", content=document.createElement("table")) {
    let modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    modal.setAttribute("id", "modal");

    let modal__body = document.createElement("div");
    modal__body.setAttribute("class", "modal__body");
    modal.appendChild(modal__body);

    let modal__content = document.createElement("div");
    modal__content.setAttribute("class", "modal__content");
    modal__body.appendChild(modal__content);

    let row1 = document.createElement("div");
    row1.setAttribute("class", "rowtop");
    modal__content.appendChild(row1);


    let title = document.createElement("div");
    title.innerText = name;
    title.setAttribute("class", "rowelement");
    row1.appendChild(title);

    let closebutton = document.createElement("button");
    closebutton.innerText = "X";
    closebutton.setAttribute("class", "rowelement");
    closebutton.addEventListener("click", () => {
        modal.remove();
      });
    row1.appendChild(closebutton);


    modal__content.appendChild(content);


    let row2 = document.createElement("div");
    row2.setAttribute("class", "rowbot");
    modal__content.appendChild(row2);

    let okbutton = document.createElement("button");
    okbutton.innerText = "Ок";
    okbutton.setAttribute("class", "rowelement");
    okbutton.addEventListener("click", () => {
        document.querySelectorAll("#modal").forEach((m) => m.remove());
        update();
      });
    row2.appendChild(okbutton);

    let cancelbutton = document.createElement("button");
    cancelbutton.innerText = "Отмена";
    cancelbutton.setAttribute("class", "rowelement");
    cancelbutton.addEventListener("click", () => {
        document.querySelectorAll("#modal").forEach((m) => m.remove());
      });
    row2.appendChild(cancelbutton);

    



    document.querySelector(".body__wrapper").appendChild(modal);
}

