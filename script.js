const notesCont = document.getElementById('app');
const addNoteBtn = notesCont.querySelector('.add-note');

// access all of the data in the localstorage or create an empty array
const getNotes=()=>{
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// save a note in the "stickynotes-notes" (in localStorage) after converting the array into JSON string
const saveNote = (notes) =>{
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
    console.log("Saved Successfully");
}

// create new textareas 
const createNoteElement=(id, content)=>{
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "🔍 What have you got?";

    // EventListener to change content of the new textarea
    element.addEventListener("change", ()=>{
        updateNote(id, element.value);
    })

    // add eventListener to delete trigger
    element.addEventListener("dblclick", ()=>{
        const doDelete = confirm("Do you wanna throw the note away?");
        if(doDelete){
            deleteNote(id, element);
        }
    })
    return element;
}

// assign id and content to the newly created textarea
const addNote = ()=>{
    const newNotes =  getNotes();
    const noteObj = {
        id : Math.floor(Math.random()*200000),
        content: ""
    };
    const noteElement = createNoteElement(noteObj.id, noteObj.content)

    // inserting the new element just before the button
    notesCont.insertBefore(noteElement, addNoteBtn);

    // saving the modified element
    newNotes.push(noteObj);
    saveNote(newNotes)
}

// find the target that the user wants to update (using filter); and then save the element
const updateNote = (id, newContent) =>{
    const note =  getNotes();
    const targetNote = note.filter(note => note.id == id)[0];
    targetNote.content = newContent
    saveNote(note);
}

// delete the content and remove the element
const deleteNote = (id, element) =>{
    const notes = getNotes().filter(note => note.id != id)
    saveNote(notes);
    notesCont.removeChild(element);
}

// load all of the content from the localstorage
getNotes().forEach(note =>{
    const noteElement = createNoteElement(note.id, note.content);
    notesCont.insertBefore(noteElement, addNoteBtn);
})

// trigger to addnote
addNoteBtn.addEventListener("click", ()=>{
    addNote();
})