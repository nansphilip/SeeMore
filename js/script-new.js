// Animates the height transition of the paragraphs.
const animate = true;

window.addEventListener("load", () => {

    // For all the `see-more` elements in the DOM.
    for (const containerEl of document.querySelectorAll(".new")) {

        const paragraphEl = containerEl.querySelector("p"),
            btnEl = containerEl.querySelector(".button");

        // Inits paragraph's style and its container.
        containerEl.classList.add("minimized");
        btnEl.innerText = "See more";

        const
            // Gets the paragraph's current height (when minimized).
            minHeight = paragraphEl.offsetHeight,
            // Gets the paragraph's full height (even when minimized, thanks to the `scrollHeight` property).
            maxHeight = paragraphEl.scrollHeight;

        // Optional animation code.
        if (animate) paragraphEl.style.height = `${minHeight}px`;

        btnEl.addEventListener("click", (e) => {

            if (containerEl.classList.contains("minimized")) {
                containerEl.classList.remove("minimized");
                btnEl.innerText = "See less";
                // Optional animation code.
                if (animate) paragraphEl.style.height = `${maxHeight}px`;
            } else {
                containerEl.classList.add("minimized");
                btnEl.innerText = "See more";
                // Optional animation code.
                if (animate) paragraphEl.style.height = `${minHeight}px`;
            }
        });
    }

});
