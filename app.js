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
      todoElement.remove();
    });
    todoElement.style.animation = "scaleDown 0.5s forwards";
  });

  toDo.appendChild(checkButton);
  toDo.appendChild(deleteButton);

  toDo.style.animation = "scaleUp 0.5s forwards";
  form.children[0].value = "";
  session.appendChild(toDo);
});
