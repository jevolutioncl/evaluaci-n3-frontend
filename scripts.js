showNotes();


let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let state = localStorage.getItem("state");
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    let stateobj;
    if (state == null) {
        stateobj = [];
    } else {
        stateobj = JSON.parse(state);
    }
    notesObj.push(myObj);
    stateobj.push(1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("state", JSON.stringify(stateobj));
    addTitle.value = "";
    addTxt.value = "";

    showNotes();
});
//MOSTRAR NOTAS
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let state = localStorage.getItem("state");
    if (state == null) {
        stateobj = [];
    } else {
        stateobj = JSON.parse(state);
    }
    let html = "";
    notesObj.forEach(function(element, id) {

        if (stateobj[id] == 1) {
            html += `
            <div class="noteCard my-2 mx-2 card notas" style="background-color: #ffc;">
                <div class="card-body markclass">
                    <button id="${id}" onclick="deleteNote(this.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                    </svg></button>
                    <br>
                    <br>
                    <h5 class="card-title text-dark">${element.title}</h5>
                    <p class="card-text text-dark">${element.text}</p>
                    <button id="ugt" onclick="markugt(${id})" class="btn btn-success  my-3">Es importante</button>
                </div>
            </div>`}
        else {
            html += `
            <div class="noteCard my-2 mx-2 card notas" style="background-color: #ffc;">
            <div class="card-body markclass">
                <button id="${id}" onclick="deleteNote(this.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                </svg></button>
                <br>
                <br>
                <h5 class="card-title text-dark">${element.title}</h5>
                <p class="card-text text-dark">${element.text}</p>
                <button id="ugt" onclick="markugt(${id})" class="btn btn-danger  my-3">No es importante</button>
            </div>
        </div>`}
        });


    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `No hay notas disponibles, usa Agregar Nota.`;
    }
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function (element, idd) {
        if (stateobj[idd] == 1) {
            element.style.background = "red";
            element.style.color = "black";
        }
        else {
            element.style.background = "#ffc";
            element.style.color = "black";
        }
    });
};
//BORRAR NOTA
function deleteNote(id) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
notesObj.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    let state = localStorage.getItem("state");
    if (state == null) {
        stateobj = [];
    }
    else {
        stateobj = JSON.parse(state);
    }
    stateobj.splice(id, 1);
    localStorage.setItem("state", JSON.stringify(stateobj));
    showNotes();
};
function markugt(id) {

    let noteCards = document.getElementsByClassName('noteCard');
    let arr = localStorage.getItem("state");
    if (arr == null) { arrobj = []; }
    else {
        arrobj = JSON.parse(arr);
    }
    Array.from(noteCards).forEach(function (element, idd) {
        let cardTxt = element.getElementsByTagName("button")[1];
        if (idd == id) {

            if (arrobj[id] == 1) {
                cardTxt.innerText =
                    "Es importante";
                element.style.background = "#ffc";
                element.style.color = "black";
                arrobj[id] = 0;
            }
            else {

                cardTxt.innerText = "No es importante";
                element.style.background = "red";
                element.style.color = "black";
                arrobj[id] = 1;
            }

        }
});
localStorage.setItem("state", JSON.stringify(arrobj));
shownotes();
}
