'use strict';

const getTitle = document.querySelector('#note-title');
const getBody = document.querySelector('#note-body');
const getButton = document.querySelector('#remove-note');
const getDate = document.querySelector('#last-edited');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();

let note = notes.find(note => note.id === noteId);

if (!note) {
    location.assign('../index.html')
}

getTitle.value = note.title;
getBody.value = note.body;
getDate.textContent = generateLastEdited(note.updatedAt);

getTitle.addEventListener('input', e => {
    note.title = e.target.value;
    note.updatedAt = moment().valueOf();
    getDate.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});
getBody.addEventListener('input', e => {
    note.body = e.target.value;
    note.updatedAt = moment().valueOf();
    getDate.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

getButton.addEventListener('click', () => {
    removeNote(note.id);
    saveNotes(notes);
    location.assign('../index.html')
});

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        note = notes.find(note => note.id === noteId);

        if (!note) {
            location.assign('../index.html')
        }

        getTitle.value = note.title;
        getBody.value = note.body;
        getDate.textContent = generateLastEdited(note.updatedAt);
    }
});
