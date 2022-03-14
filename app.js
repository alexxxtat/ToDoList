let session = document.querySelector("section.outputArea");
let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  e.preventDefault();

  // get the input items
  let form = e.target.parentElement;
  let toDoText = form.children[0].value;
  let toDoMonth = form.children[1].value;
  let toDoDay = form.children[2].value;
  console.log(toDoText, toDoMonth, toDoDay);

  if (toDoText === "") {
    alert("Please enter something, it cannot be empty");
    return;
  }
  //display input items
  let toDo = document.createElement("div");
  //add class name to the element tag
  toDo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = toDoText;

  let time = document.createElement("p");
  time.innerHTML = toDoMonth + "/ " + toDoDay;
  time.classList.add("todo-time");
  let br = document.createElement("br");
  toDo.appendChild(text);
  toDo.appendChild(time);
  toDo.appendChild(br);

  //create logo
  let checkButton = document.createElement("button");
  checkButton.classList.add("check");
  checkButton.innerHTML = '<i class="fa-solid fa-check-to-slot"></i>';
  checkButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    console.log(todoItem);
    todoItem.classList.toggle("done");
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
  deleteButton.addEventListener("click", (e) => {
    let todoElement = e.target.parentElement;
    todoElement.addEventListener("animationend", (e) => {
      //remove from local storage
      let text = todoElement.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.toDoText == text) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });
      todoElement.remove();
    });
    todoElement.style.animation = "scaleDown 0.5s forwards";
  });

  toDo.appendChild(checkButton);
  toDo.appendChild(deleteButton);

  //create an object
  let myToDo = {
    toDoText: form.children[0].value,
    toDoMonth: form.children[1].value,
    toDoDay: form.children[2].value,
  };
  // store data using local storage\
  //using an array of objects
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myToDo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  toDo.style.animation = "scaleUp 0.5s forwards";
  form.children[0].value = "";
  session.appendChild(toDo);
});

let myList = localStorage.getItem("list");
if (myList !== null) {
  let myListArray = JSON.parse(myList);
  myListArray.forEach((item) => {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = item.toDoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = item.toDoMonth + " / " + item.toDoDay;
    todo.appendChild(text);
    todo.appendChild(time);

    let checkButton = document.createElement("button");
    checkButton.classList.add("check");
    checkButton.innerHTML = '<i class="fa-solid fa-check-to-slot"></i>';
    checkButton.addEventListener("click", (e) => {
      let todoItem = e.target.parentElement;
      console.log(todoItem);
      todoItem.classList.toggle("done");
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
    deleteButton.addEventListener("click", (e) => {
      let todoElement = e.target.parentElement;
      todoElement.addEventListener("animationend", (e) => {
        let text = todoElement.children[0].innerText;
        console.log(text);
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((item, index) => {
          console.log(item.toDoText);

          if (item.toDoText == text) {
            myListArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });
        todoElement.remove();
      });
      todoElement.style.animation = "scaleDown 0.5s forwards";
    });
    todo.appendChild(checkButton);
    todo.appendChild(deleteButton);
    session.append(todo);
  });
}
