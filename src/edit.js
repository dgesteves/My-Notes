import {generateLastEdited, initializeEditPage} from "./views";
import {removeNote, updateNote} from "./notes";

const getTitle = document.querySelector('#note-title');
const getBody = document.querySelector('#note-body');
const getButton = document.querySelector('#remove-note');
const getDate = document.querySelector('#last-edited');
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

getTitle.addEventListener('input', e => {
    const note = updateNote(noteId, {
        title: e.target.value
    });
    getDate.textContent = generateLastEdited(note.updatedAt);
});
getBody.addEventListener('input', e => {
    const note = updateNote(noteId, {
        body: e.target.value
    });
    getDate.textContent = generateLastEdited(note.updatedAt);
});

getButton.addEventListener('click', () => {
    removeNote(noteId);
    location.assign('./index.html')
});

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
});

