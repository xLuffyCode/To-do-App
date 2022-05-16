//getting all required elements
const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
	let userData = inputBox.value;//getting user entered value
	if (userData.trim() !=0) {//if user values aren't only spaaces
		addBtn.classList.add("active");//active the add button
	}else{
		addBtn.classList.remove("active");//unactive the add button
	}
}

//if user click on the add button
addBtn.onclick = ()=>{
	let userData = inputBox.value;//getting user entered value
	let getLocalStorage = localStorage.getItem("New Todo");//getting localstorage
	if (getLocalStorage == null) {//if localstorage is null
		listArr = []; //creating blank array
	}else{
		listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
	}
	listArr.push(userData);// pushing or adding user data
	localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
	showTasks(); //calling showtasks function
}
// function to add task list inside ul
function showTasks() {
	let getLocalStorage = localStorage.getItem("New Todo");//getting localstorage
	if (getLocalStorage == null) {//if localstorage is null
		listArr = []; //creating blank array
	}else{
		listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
	}
	addBtn.classList.remove("active");//unactive the add button
	const pendingNumb = document.querySelector(".pendingNumb");
	pendingNumb.textContent = listArr.length;//passing the length value in pendingNumb
	if (listArr.length >0) {
		deleteAllBtn.classList.add("active");//active the remove button
	}else{
		deleteAllBtn.classList.remove("active");//unactive the add button
	}
	let newLiTag = '';
	listArr.forEach((element, index)=>{
		newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i>delete</i></span></li>`;
	});
	todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
	inputBox.value = ""; //once task is added leave the input field
}
//delete task function
function deleteTask(index) {
	let getLocalStorage = localStorage.getItem("New Todo");
	listArr = JSON.parse(getLocalStorage);
	listArr.splice(index, 1); //remove or delete the particular indexed li
	//after remove the li again update the local storage
	localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
	showTasks(); //calling showtasks function
}

//delete all function
deleteAllBtn.onclick = () =>{
	listArr = []; // empty an array 
	//after remove all the li again update the local storage
	localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
	showTasks(); //calling showtasks function
}