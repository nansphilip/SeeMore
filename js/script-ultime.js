$(document).ready(() => {
    // Initialize elements variables
    const paragraphEl = $('.ultime');
    const textEl = paragraphEl.find('p');
    const buttonEl = paragraphEl.find('button');

    // Initialize heights variables
    const lineHeight = parseInt(textEl.css('line-height'));

    // Initialize texts variables
    const originalText = textEl.text().trim();
    const splitParagraph = originalText.split(' ');

    const maxWordsNumber = splitParagraph.length;

    const textHeight = textEl.height();
    let linesNumber = Math.round(textHeight / lineHeight);
    let wordsPerLine = maxWordsNumber / linesNumber;

    const minWordsNumber = Math.round(wordsPerLine * 2.5);
    const minMaxDiff = maxWordsNumber - minWordsNumber;

    textEl.text(splitParagraph.slice(0, minWordsNumber).join(' ').trim());
    buttonEl.text('Voir plus')

    buttonEl.on('click', () => {
        paragraphEl.toggleClass('minimized');
        if (paragraphEl.hasClass('minimized')) {
            for (let i = 1; i <= (minMaxDiff); i++) {
                setTimeout(() => {
                    shortText = splitParagraph.slice(0, maxWordsNumber - i).join(' ').trim();
                    textEl.text(shortText);
                }, 200 / minMaxDiff * i);
            }
            buttonEl.text('Voir plus')
        } else {
            for (let i = 1; i <= (minMaxDiff); i++) {
                setTimeout(() => {
                    shortText = splitParagraph.slice(0, minWordsNumber + i).join(' ').trim();
                    textEl.text(shortText);
                }, 200 / minMaxDiff * i);
            }
            buttonEl.text('Voir moins')
        }
    });

});