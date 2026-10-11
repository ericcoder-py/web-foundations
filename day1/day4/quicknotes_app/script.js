document.addEventListener("DOMContentLoaded", () => {
    // 1. Elements selected with querySelector
    const noteForm = document.querySelector("#note-form");
    const noteInput = document.querySelector("#note-input");
    const noteCategory = document.querySelector("#note-category");
    const searchInput = document.querySelector("#search-input");
    const notesList = document.querySelector("#notes-list");
    const noteCount = document.querySelector("#note-count");
    const errorMessage = document.querySelector("#error-message");
    const clearAllBtn = document.querySelector("#clear-all-btn");

    // 2. Notes array loaded from localStorage
    let notes = JSON.parse(localStorage.getItem("quicknotes_data")) || [];

    // Helper: Save notes array to localStorage
    function saveNotes() {
        localStorage.setItem("quicknotes_data", JSON.stringify(notes));
    }

    // Helper: Update Note Count Message
    function updateCountMessage(filteredCount) {
        if (filteredCount === 0) {
            noteCount.textContent = "You have no notes yet.";
        } else if (filteredCount === 1) {
            noteCount.textContent = "You have 1 note.";
        } else {
            noteCount.textContent = `You have ${filteredCount} notes.`;
        }
    }

    // 3. Render function using createElement & textContent (Never innerHTML for user text)
    function render() {
        notesList.innerHTML = "";
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Filter notes by search term
        const filteredNotes = notes.filter(note => 
            note.text.toLowerCase().includes(searchTerm)
        );

        // Update total count
        updateCountMessage(filteredNotes.length);

        // Check search empty state
        if (filteredNotes.length === 0 && searchTerm !== "") {
            const noMatchMsg = document.createElement("li");
            noMatchMsg.textContent = "No notes match your search.";
            noMatchMsg.style.color = "#777";
            noMatchMsg.style.fontStyle = "italic";
            notesList.appendChild(noMatchMsg);
            return;
        }

        // Rebuild elements
        filteredNotes.forEach(note => {
            const li = document.createElement("li");
            li.className = `note-card category-${note.category.toLowerCase()}`;

            const detailsDiv = document.createElement("div");
            detailsDiv.className = "note-details";

            const textPara = document.createElement("p");
            textPara.className = "note-text";
            textPara.textContent = note.text; // Safe from XSS

            const metaPara = document.createElement("p");
            metaPara.className = "note-meta";

            const categorySpan = document.createElement("span");
            categorySpan.className = "category-badge";
            categorySpan.textContent = `[${note.category}] `;

            const dateSpan = document.createElement("span");
            dateSpan.textContent = note.createdAt;

            metaPara.appendChild(categorySpan);
            metaPara.appendChild(dateSpan);

            detailsDiv.appendChild(textPara);
            detailsDiv.appendChild(metaPara);

            // Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteNote(note.id));

            li.appendChild(detailsDiv);
            li.appendChild(deleteBtn);

            notesList.appendChild(li);
        });
    }

    // 4. Add Note Logic with Validation
    noteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const textValue = noteInput.value.trim();

        if (textValue === "") {
            errorMessage.textContent = "Please type a note first.";
            return;
        }

        if (textValue.length > 200) {
            errorMessage.textContent = "Notes must be 200 characters or fewer.";
            return;
        }

        // Clear error if valid
        errorMessage.textContent = "";

        const newNote = {
            id: Date.now(),
            text: textValue,
            category: noteCategory.value,
            createdAt: new Date().toLocaleString()
        };

        notes.push(newNote);
        saveNotes();
        render();

        noteInput.value = "";
    });

    // 5. Delete Note Logic
    function deleteNote(id) {
        notes = notes.filter(note => note.id !== id);
        saveNotes();
        render();
    }

    // 6. Search Feature
    searchInput.addEventListener("input", render);

    // Bonus (+5 points): Clear All
    if (clearAllBtn) {
        clearAllBtn.addEventListener("click", () => {
            if (notes.length === 0) return;
            if (confirm("Delete all notes?")) {
                notes = [];
                saveNotes();
                render();
            }
        });
    }

    // Initial load
    render();
});
