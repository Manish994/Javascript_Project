//Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const listElement = document.getElementById("list");
const inputElement = document.getElementById("input");


//
//Classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


//
//Variables
let LIST, id;


//
//get item from localStorage
const data = localStorage.getItem("ToDo");
//check data is not empty
if (data) {
   debugger;
   LIST = JSON.parse(data);
   //set the id to last from list length
   id = LIST.length;
   //load the LIST to the user interface
   loadList(LIST);
} else {
   //IF data is empty
   //create empty LIST array
   LIST = [];
   id = 0;
}
//loads item to the user interface
function loadList(array) {
   array.forEach(function (indexValue) {
      addToDo(indexValue.name, indexValue.id, indexValue.done, indexValue.trash);
   })
}
//clear local storage
clear.addEventListener("click", (() => {
   localStorage.clear();
   location.reload();
}));



//
//Show Today date
const options = {
   weekday: "long",
   month: "short",
   day: "numeric"
}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-us", options);



//
//Function add to do
function addToDo(todo, id, done, trash) {
   if (trash) {
      return;
   }

   const DONE = done ? CHECK : UNCHECK;
   const LINE = done ? LINE_THROUGH : "";

   const item = `<li class="item">
   <i class="fa ${DONE} co" job="complete" id=${id}></i>
   <p class="text ${LINE}">${todo}</p>
   <i class="fa fa-trash-o de" job="delete" id=${id}></i>
   </li>`;
   const position = "beforeend";
   listElement.insertAdjacentHTML(position, item);
}



//
//add an item to the user interface when press Enter Key
document.addEventListener("keyup", function (e) {
   if (e.keyCode == 13) {
      const todo = inputElement.value;
      //check empty or not 
      if (todo) {
         addToDo(todo, id, false, false);
         LIST.push({
            name: todo,
            id: id,
            done: false,
            trash: false
         });

         //add item to local storage
         //this code must be added where list array is updated
         localStorage.setItem("ToDo", JSON.stringify(LIST));
         id++;
      }
      inputElement.value = '';
   }
});



//
//Complete To Do (toggle)
function completeToDo(element) {
   element.classList.toggle(CHECK);
   element.classList.toggle(UNCHECK);
   element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

   LIST[element.id].done = LIST[element.id].done ? false : true;
}
//remove ToDo
function removeToDo(element) {
   element.parentNode.parentNode.removeChild(element.parentNode);
   LIST[element.id].trash = true;
}
//target the item dynamically
listElement.addEventListener("click", function (e) {
   //returns the clicked element which is inside the list
   const element = e.target;
   const elementJOB = element.attributes.job.value;
   if (elementJOB === "complete") {
      completeToDo(element);
   } else if (elementJOB === "delete") {
      removeToDo(element);
   }
   //add item to local storage
   //this code must be added where LIST array is updated.
   localStorage.setItem("ToDo", JSON.stringify(LIST));
})