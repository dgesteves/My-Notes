import moment from 'moment'
import {getFilters} from "./filters"
import {getNotes, sortNotes} from './notes'

// Generate DOM structure for a note
const generateNoteDOM = note => {
    const noteElement = document.createElement('a');
    const textElement = document.createElement('p');
    const statusElement = document.createElement('p');

    // Setup the note title text
    note.title.length > 0 ? textElement.textContent = `${note.title}` : textElement.textContent = `Unnamed Note`;
    textElement.classList.add('list-item__title');
    noteElement.appendChild(textElement);

    // Setup the link
    noteElement.setAttribute('href', `./edit.html#${note.id}`);
    noteElement.classList.add('list-item');

    // Setup the status message
    statusElement.textContent = generateLastEdited(note.updatedAt);
    statusElement.classList.add('list-item__subtitle');
    noteElement.appendChild(statusElement);

    return noteElement
};


// Render application Notes
const renderNotes = () => {
    const notesElement = document.querySelector('#notes');
    const filters = getFilters();
    const notes = sortNotes(filters.sortBy);
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    notesElement.innerHTML = '';

    if (filteredNotes.length > 0) {
        filteredNotes.forEach(note => {
            const noteElement = generateNoteDOM(note);
            notesElement.appendChild(noteElement);
        })
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'no notes to show';
        emptyMessage.classList.add('empty-message');
        notesElement.appendChild(emptyMessage);
    }
};

const initializeEditPage = (noteId) => {
    const getTitle = document.querySelector('#note-title');
    const getBody = document.querySelector('#note-body');
    const getDate = document.querySelector('#last-edited');
    const notes = getNotes();
    const note = notes.find(note => note.id === noteId);

    if (!note) {
        location.assign('../../notesApp/public/index.html')
    }

    getTitle.value = note.title;
    getBody.value = note.body;
    getDate.textContent = generateLastEdited(note.updatedAt);
};

// Generate the last edited massage
const generateLastEdited = timestamp => `Last edited ${moment(timestamp).fromNow()}`;

export {generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage}
