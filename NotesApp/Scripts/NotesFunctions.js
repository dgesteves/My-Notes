'use strict';

// Check for existing notes on localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');

    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        return [];
    }
};

// Save the notes to localStorage
const saveNotes = notes => localStorage.setItem('notes', JSON.stringify(notes));

// Remove a note from the list
const removeNote = id => {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
};

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

// Sort notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'alphabetically') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes;
    }
};

// Render application Notes
const renderNotes = (notes, filters) => {
    const notesElement = document.querySelector('#notes');
    notes = sortNotes(notes, filters.sortBy);
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

// Generate the last edited massage
const generateLastEdited = timestamp => `Last edited ${moment(timestamp).fromNow()}`;

