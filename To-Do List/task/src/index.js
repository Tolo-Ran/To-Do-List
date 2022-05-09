showCurrentDate();
let startValuesTasks = [];
let taskObj = [];

try {
    startValuesTasks = JSON.parse(localStorage.getItem("tasks"));
} catch (e) {
    console.log(e);
}

if (startValuesTasks != null) {
    for (let task of startValuesTasks) {
        taskObj.push(task);
        createTaskFromObject(task);
    }
}

function showCurrentDate() {
    let today = new Date().toLocaleDateString();
    document.querySelector(".card-body-span").appendChild(document.createTextNode("Today: " + today));
}

function createDivWithInputCheckbox(span, isChecked) {
    /*Create div for Checkbox*/
    let divCheckbox = document.createElement("div");
    divCheckbox.classList.add("col-1");

    /*create checkbox */
    let checkbox = document.createElement("input");
    checkbox.className += "form-check-input check";
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("area-label", "...");
    if (isChecked) {
        checkbox.setAttribute("checked", "checked");
        span.classList.add("done");
    }
    checkbox.addEventListener("change", function () {
        span.classList.toggle("done");
        let taskList = JSON.parse(localStorage.getItem("tasks"));
        for (let task of taskList) {
            if (task.text === span.innerText) {
                task.isChecked = true;
                taskObj = taskList;
                localStorage.setItem("tasks", JSON.stringify(taskObj));
            }
        }

    });

    /*Add checkbox into div*/
    divCheckbox.appendChild(checkbox);

    return divCheckbox;
}

function createSpan(task) {
    /*Create Span*/
    let span = document.createElement("span");
    span.className += "form-check-label task text-justify";

    span.setAttribute("for", "flexCheckDefault");
    span.appendChild(document.createTextNode(task));

    return span;
}

function createDivForSpan(span) {
    /*Create div for span task*/
    let divSpanTask = document.createElement("div");
    divSpanTask.className = "col-10 px-0";

    /*Add span to div span*/
    divSpanTask.appendChild(span);

    return divSpanTask;
}

function createDivWithDeleteTaskBtn(span) {
    /*Create a div for delete btn*/
    let divBtn = document.createElement("div");
    divBtn.classList.add("col-1")

    /*Create delete btn*/
    let btnDel = document.createElement("button");
    btnDel.className +="delete-btn btn btn-light bg-info";

    /*Create awesome icon for delete btn*/
    let icon = document.createElement("i");
    icon.className = "fa-solid fa-trash-can";
    btnDel.appendChild(icon);

    /*Handle delete Event Listener */
    btnDel.addEventListener("click", function () {
        this.parentNode.parentNode.parentNode.remove();
        let tasksList = JSON.parse(localStorage.getItem("tasks"));
        for (let task of tasksList) {
            if (task.text === span.innerText) {
                let index = tasksList.indexOf(task);
                tasksList.splice(index, 1);
            }
        }
        taskObj = tasksList;
        localStorage.setItem("tasks", JSON.stringify(taskObj));
    });

    /*Add btn to div Btn*/
    divBtn.appendChild(btnDel);

    return divBtn;
}

function createALiElement(divRow) {
    /*Create a li DOM*/
    let li = document.createElement("li");
    li.className = "list-group-item bg-info";

    /*Add div for one row to li DOM */
    li.appendChild(divRow);

    /*Add created list to html ul */
    document.querySelector("#task-list").appendChild(li);
}

function showEmptyModalDialog() {
    let addBtn = document.querySelector("#add-task-button");
    addBtn.setAttribute("data-bs-toggle", "modal");
    addBtn.setAttribute("data-bs-target", "#empty-task-modal");
    addBtn.click();
    document.querySelector("#btn-close-text").addEventListener("click", function () {
        addBtn.removeAttribute("data-bs-toggle");
        addBtn.removeAttribute("data-bs-target");
    });
    document.querySelector("#btn-close-x").addEventListener("click", function () {
        addBtn.removeAttribute("data-bs-toggle");
        addBtn.removeAttribute("data-bs-target");
    });
}

function createARowForALi(divCheckbox, divSpan, divDelBtn) {
    /*Create a div for one row*/
    let divRow = document.createElement("div");
    divRow.className += "container row px-1";

    /*Add divs checkbox, div span and div btn to div Row*/
    divRow.appendChild(divCheckbox);
    divRow.appendChild(divSpan);
    divRow.appendChild(divDelBtn);
    return divRow;
}

function handleAddNewTasK() {
    let task = document.querySelector("#input-task").value;

    if (task === "") {
        showEmptyModalDialog();
    } else {
        let span = createSpan(task);
        let oneRow = createARowForALi(createDivWithInputCheckbox(span, false), createDivForSpan(span), createDivWithDeleteTaskBtn(span));
        createALiElement(oneRow);
        let tskObj = {
            isChecked: false,
            text: span.innerText
        }
        taskObj.push(tskObj);
        localStorage.setItem("tasks", JSON.stringify(taskObj));
        /*Delete text value from the new task input area*/
        document.querySelector("#input-task").value = "";
    }
}

/*Event Listeners*/
document.querySelector("#add-task-button").addEventListener("click", handleAddNewTasK);
document.querySelector("#input-task").addEventListener("keypress", (event) => {

    if (event.keyCode === 13) {
        event.preventDefault();
        handleAddNewTasK();
    }
});

/*
Create a list from an JS Object
 */

function createTaskFromObject(taskObj) {
    let task = taskObj.text;
    let isChecked = taskObj.isChecked;
    let span = createSpan(task);
    let oneRow = createARowForALi(createDivWithInputCheckbox(span, isChecked), createDivForSpan(span), createDivWithDeleteTaskBtn(span));
    createALiElement(oneRow);
}









