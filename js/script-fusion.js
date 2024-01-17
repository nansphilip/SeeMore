$(document).ready(() => {
    $('.fusion').each(function () {
        // Initialize elements variables
        const paragraphEl = $(this);
        const textEl = paragraphEl.find('p');
        const buttonEl = paragraphEl.find('button');

        // Initialize heights variables
        const lineHeight = parseInt(textEl.css('line-height'));
        const min = lineHeight * 3;
        let max = undefined;

        // Initialize texts variables
        const originalText = textEl.text().trim();
        let shortText = undefined;


        const getHeight = () => {
            let hasMinimizedClass = paragraphEl.hasClass('minimized');
            if (hasMinimizedClass) textEl.text(originalText);

            max = textEl.height();

            if (hasMinimizedClass) textEl.text(shortText);
        };

        const getShortText = () => {
            // Counts lines
            const linesNumber = max / lineHeight;
            // Counts words
            const splitParagraph = originalText.split(' ');
            const wordsNumber = splitParagraph.length;
            // Counts words per line
            const wordsPerLine = wordsNumber / linesNumber;
            // Creates short text
            const shortTextSize = wordsPerLine * 2.7;
            shortText = splitParagraph.slice(0, shortTextSize).join(' ').trim() + '... ';
        };

        const toggleClass = () => {
            paragraphEl.toggleClass('minimized');
        };

        const setHeight = () => {
            const hasMinimized = paragraphEl.hasClass('minimized');
            if (hasMinimized) paragraphEl.height(min);
            else paragraphEl.height(max);
        };

        const setText = () => {
            const hasMinimized = paragraphEl.hasClass('minimized');
            if (hasMinimized) textEl.text(shortText);
            else textEl.text(originalText);
        };

        const setTitle = () => {
            const hasMinimized = paragraphEl.hasClass('minimized');
            if (hasMinimized) buttonEl.text('Voir plus');
            else buttonEl.text('Voir moins');
        };

        const display = () => {
            const numberOfLines = max / lineHeight;
            if (numberOfLines > 3) buttonEl.show();
            else {
                buttonEl.hide();
                textEl.text(originalText);
            }
        };


        // On load
        getHeight();
        getShortText();
        setHeight();
        setText();
        setTitle();
        display();

        // On resize
        $(window).on('resize', () => {
            getHeight();
            getShortText();
            setHeight();
            setText();
            display();
        });

        // On click
        buttonEl.on('click', () => {
            toggleClass();
            setHeight();
            setText();
            setTitle();
        });
    });
});