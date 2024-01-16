$(document).ready(() => {
    const paragraphEl = $('.test-2');
    const textEl = paragraphEl.find('p');
    const toggleEl = paragraphEl.find('button');

    let paragraphMinHeight, paragraphMaxHeight, cutText = undefined;

    // Store original text
    const originalText = textEl.text().trim() + ' ';

    const isVisible = () => {

    };

    const mesureHeights = () => {
        // Reset
        textEl.text(originalText);
        paragraphEl.css('height', '');
        toggleEl.text('Voir plus');

        // Count number of lines
        let textHeight = textEl.height();
        let lineHeight = parseInt(textEl.css('line-height'));
        let numberOfLines = Math.round(textHeight / lineHeight);

        // Calculer les hauteurs minimale et maximale
        paragraphMinHeight = (lineHeight * 3 + 32) + 'px';
        paragraphMaxHeight = (textHeight + 32) + 'px';

        // Count words
        let splitParagraph = originalText.split(' ');
        let wordsNumber = splitParagraph.length;
        let wordsPerLine = Math.floor(wordsNumber / numberOfLines);

        // Store cut text
        let limitNumberOfWords = Math.round(wordsPerLine * 2.5);
        cutText = splitParagraph.slice(0, limitNumberOfWords).join(' ').trim() + '... ';
    };

    const toggle = () => {
        if (paragraphEl.hasClass('minimized')) {
            paragraphEl.css('height', paragraphMinHeight);
            textEl.text(cutText);
            toggleEl.text('Voir plus');
        }
        else {
            paragraphEl.css('height', paragraphMaxHeight);
            textEl.text(originalText);
            toggleEl.text('Voir moins');
        }
    };

    // On load
    if (!isVisible()) {
        mesureHeights();
        toggle();
    }

    // On resize
    $(window).on('resize', () => {
        if (!isVisible()) {
            mesureHeights();
            toggle();
        }
    });

    // On click
    toggleEl.on('click', () => {
        paragraphEl.toggleClass('minimized');
        toggle();
    });
});