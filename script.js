let todoArray = [];
const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

let isEdit = false;

// Challenge: Try and using your addTaskButton with a "keydown" eventlistener
// and create a way to use the enter key to submit a new list item.

addTaskButton.addEventListener("click", (e) => {
  e.preventDefault(); // This prevents the page from reloading.
  input();
});

addEventListener("keydown", (event) => {
  if (event.key === "Enter" && isEdit === false) {
    input();
  } else if (event.key === "Enter" && isEdit === true) {
    updateList();
  }
});

function input() {
  // start by setting a variable named todo to equal localstorage.getitem("todo")
  // Add code below this line
  let todo = localStorage.getItem("todo");
  // check if todo is null, if it is set todoArray = []
  // else set todoArray to JSON.parse() your variable passed into the parse method.
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  // check if text.value is empty, alert that the input is empty and return
  if (text.value === "") {
    alert("Input is empty");
    return;
  }
  // now that you've parsed the value, push the text.value to the todoArray.
  todoArray.push(text.value);
  // set the text.value to an empty string.
  text.value = "";
  // get the localstorage method and use the setItem and pass in todo
  // and pass in JSON.stringify(todoArray).
  localStorage.setItem("todo", JSON.stringify(todoArray));
  // lastly call display todo method
  displayTodo();
}

// Add code below this comment to do the following:
// 1. when the page loads, call displayTodo() method
window.onload = displayTodo();
// This method is already in place for you.
function displayTodo() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = "";
  todoArray.forEach((list, ind) => {
    htmlCode += `<div class='flex mb-4 items-center'>
          <p class='w-full text-white font-bold'>${list}</p>
          <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 rounded text-white text-grey bg-green-600'>Edit</button>
          <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 rounded text-white bg-red-500'>Delete</button>
       </div>`;
  });
  listBox.innerHTML = htmlCode;
}

function deleteTodo(ind) {
  // call the todo and let it equal localstorage.getitem("todo")
  // assign the todoArray equal to JSON.parse(todo)
  // use the todoArray and use the splice method on the ind and pass in 1 as well.
  // set the todo in local storage and use the JSON.stringify(todoArray)
  // call the display todo method
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  todoArray.splice(ind, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}

function edit(ind) {
  // set the saveInd.value equal to the ind
  // call the todo and let it equal localstorage.getitem("todo")
  // assign the todoArray equal to JSON.parse(todo)
  // assign the text.value to the array and get the index [ind].
  // set the addTaskButton display to none
  // set the saveTaskButton display to block
  saveInd.value = ind;
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  text.value = todoArray[ind];
  addTaskButton.style.display = "none";
  saveTaskButton.style.display = "block";

  isEdit = true;
}

saveTaskButton.addEventListener("click", () => {
  updateList();
});

function updateList() {
  // this is the challenge for this project
  // in this part you will need to add the following:
  // 1. call the todo and let it equal localstorage.getitem("todo")
  // 2. assign the todoArray equal to JSON.parse(todo)
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);

  if (text.value === "") {
    alert("Invalid input, try again");
    return;
  }
  // then finish out the rest of the following instructions:
  // 1. let id be the same as your saveInd.value
  // 2. switch the add and save displays to block and none respectively.
  // 3. set text value to empty
  // 4. and use the localstorage method setItem, pass in todo and stringify the array.
  // 5. display todo method called.
  let id = saveInd.value;
  todoArray[id] = text.value;
  addTaskButton.style.display = "block";
  saveTaskButton.style.display = "none";
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();

  isEdit = false;
}
