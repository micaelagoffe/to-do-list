let id = 0;
let toDoList = [];
let doneList = [];

class ToDo {
  constructor(todo) {
    this.id = id++;
    this.todo = todo;
  }
}

window.onload = function () {
  createArray();
  createHtml();

  document.getElementById("form").addEventListener('submit', function (event) {
    event.preventDefault();
    addToDo();
  })

  document.querySelector('.sortBtn').addEventListener('click', sortArray);
}

function createArray() {
  let toDo0 = new ToDo("Plugga");
  let toDo1 = new ToDo("Handla mat");
  let toDo2 = new ToDo("Hathayoga kl. 16:00");
  let toDo3 = new ToDo("Köp present till brorsan");
  let toDo4 = new ToDo("Gör rent ugnen");
  let toDo5 = new ToDo("Ring mormor & morfar");
  let toDo6 = new ToDo("Boka frisörtid");

  toDoList.push(toDo0);
  toDoList.push(toDo1);
  toDoList.push(toDo2);
  toDoList.push(toDo3);
  toDoList.push(toDo4);
  toDoList.push(toDo5);
  toDoList.push(toDo6);
}

function addToDo() {
  let textbox = document.getElementById("textbox");
  let userInput = document.getElementById("textbox").value;
  let userToDo = new ToDo(userInput);

  if (userInput == "") {
    textbox.setAttribute("placeholder", "Du måste skriva något");
    return false;
  }

  toDoList.push(userToDo);

  textbox.value = "";

  createHtml();
}

function createHtml() {
  let ulToDo = document.querySelector(".ulToDo");
  ulToDo.innerHTML = "";

  for (let i = 0; i < toDoList.length; i++) {
    let li = document.createElement('li');
    let doneBtn = document.createElement('button');
    let removeBtn = document.createElement('button');

    li.className = "li";

    doneBtn.innerHTML = '<i class="fas fa-check"></i>';
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
    li.innerHTML = toDoList[i].todo;

    doneBtn.addEventListener('click', () => {
      isDone(toDoList[i]);
    })

    removeBtn.addEventListener('click', () => {
      remove(toDoList[i]);
    })
    
    ulToDo.appendChild(li);
    li.appendChild(removeBtn);
    li.appendChild(doneBtn);
  }
}

function createHtmlDone() {
  let ulDone = document.querySelector(".ulDone");
  ulDone.innerHTML = "";

  for (let i = 0; i < doneList.length; i++) {
    let liDone = document.createElement('li');
    let moveBackBtn = document.createElement('button');
    let trashBtn = document.createElement('button');

    liDone.className = "liDone";

    moveBackBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    liDone.innerHTML = doneList[i].todo;

    moveBackBtn.addEventListener('click', () => {
      moveBack(doneList[i]);
    })

    trashBtn.addEventListener('click', () => {
      removeDone(doneList[i]);
    })

    ulDone.appendChild(liDone);
    liDone.appendChild(trashBtn);
    liDone.appendChild(moveBackBtn);
  }
}

function sortArray() {
  toDoList.sort((a, b) => {
    let todoA = a.todo.toLowerCase();
    let todoB = b.todo.toLowerCase();

    if (todoA < todoB)
    return -1;

    if (todoA > todoB)
    return 1;
    return 0;
  })
  createHtml();
}

function isDone(toDo) {
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].id == toDo.id) {
      let toDosDone = toDoList.splice(i, 1);

      createHtml();

      for (let i = 0; i < toDosDone.length; i++) {
        doneList.push(toDosDone[i]);

        createHtmlDone();
      }
    }
  }
}

function moveBack(toDo) {
  for (i = 0; i < doneList.length; i++) {
    if (doneList[i].id == toDo.id) {
      let toDosDone = doneList.splice(i, 1);

      createHtml();
      createHtmlDone();

      for (let i = 0; i < toDosDone.length; i++) {
        toDoList.push(toDosDone[i]);

        createHtml();
        createHtmlDone();
      }
    }
  }
}

function remove(toDo) {
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].id == toDo.id) {
      toDoList.splice(i, 1);

      createHtml();
    }
  }
}

function removeDone(toDo) {
  for (let i = 0; i < doneList.length; i++) {
    if (doneList[i].id == toDo.id) {
      doneList.splice(i, 1);

      createHtmlDone();
    }
  }
}