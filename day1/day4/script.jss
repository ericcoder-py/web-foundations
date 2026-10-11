document.addEventListener("DOMContentLoaded", () => {
    const noteText = document.getElementById("note-text");
    const charCount = document.getElementById("char-count");
    const wordCount = document.getElementById("word-count");
    const clearBtn = document.getElementById("clear-btn");
    const themeToggle = document.getElementById("theme-toggle");

    // 3. updateCounts function to update both counters and warning classes
    function updateCounts() {
        const text = noteText.value;
        const characters = text.length;
        
        // Word count logic: split by whitespace and filter out empty strings
        const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

        charCount.textContent = `${characters} / 200 characters`;
        wordCount.textContent = `${words} words`;

        // Reset classes
        charCount.classList.remove("warning", "over");

        // Apply warning/over classes based on character length
        if (characters > 200) {
            charCount.classList.add("over");
        } else if (characters > 180) {
            charCount.classList.add("warning");
        }
    }

    // 5. Restore saved draft and theme on page load, then call updateCounts()
    const savedDraft = localStorage.getItem("noteDraft");
    if (savedDraft !== null) {
        noteText.value = savedDraft;
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "Light mode";
    } else {
        themeToggle.textContent = "Dark mode";
    }

    updateCounts();

    // 4. Call updateCounts() and save the draft on every input event
    noteText.addEventListener("input", () => {
        updateCounts();
        localStorage.setItem("noteDraft", noteText.value);
    });

    // 6. Make the Clear button clear everything
    function clearEverything() {
        noteText.value = "";
        localStorage.removeItem("noteDraft");
        updateCounts();
    }

    clearBtn.addEventListener("click", clearEverything);

    // 6. Make the Escape key clear everything inside the textarea
    noteText.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            clearEverything();
        }
    });

    // 7. Make the theme button toggle dark mode and remember the choice
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "Light mode";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "Dark mode";
        }
    });
});