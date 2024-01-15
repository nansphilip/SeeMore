$(document).ready(() => {
    let $paragraphEl = $('.fusion');
    let $textEl = $paragraphEl.find('.info');
    let $toggleEl = $paragraphEl.find('.toggle');
    let $paragraphMinHeight, $paragraphMaxHeight, $cutText = undefined;

    // Store original text
    const $originalText = $textEl.text().trim() + ' ';

    let MesureHeights = () => {
        // Count number of lines
        let $textHeight = $textEl.height();
        let $lineHeight = parseInt($textEl.css('line-height'));
        let $numberOfLines = Math.round($textHeight / $lineHeight);
        
        $paragraphMinHeight = ($lineHeight * 3 + 32) + 'px';
        $paragraphMaxHeight = ($textHeight + 32) + 'px';

        // Count words
        let $splitParagraph = $originalText.split(' ');
        let $wordsNumber = $splitParagraph.length;
        let $wordsPerLine = Math.floor($wordsNumber / $numberOfLines);

        // Store cut text
        let $limitNumberOfWords = Math.round($wordsPerLine * 2.7);
        $cutText = $splitParagraph.slice(0, $limitNumberOfWords).join(' ').trim() + '... ';
    };

    let Toggle = () => {
        if ($paragraphEl.hasClass('min')) {
            $textEl.text($cutText);
            $paragraphEl.css('height', $paragraphMinHeight);
            $toggleEl.text('Voir plus');
        }
        else {
            $textEl.text($originalText);
            $paragraphEl.css('height', $paragraphMaxHeight);
            $toggleEl.text('Voir moins');
        }
    };

    // On load
    MesureHeights();
    Toggle();

    // On resize
    $(window).resize(() => {
        MesureHeights();
        Toggle();
    });

    // On click
    $toggleEl.on('click', () => {
        $paragraphEl.toggleClass('min');
        Toggle();
    });
});