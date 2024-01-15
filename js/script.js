let $paragraphEl = $('.paragraph');
let $textEl = $('.paragraph > .text');
let $buttonElList = $('.paragraph > .button');
let $textMaxHeight, $textMinHeight = undefined;
let $minimizeSate = true;

let IsVisible = () => {

    // Store minimized state if all text isn't visible
    if (!$paragraphEl.hasClass('visible')) {
        $minimizeSate = $paragraphEl.hasClass('minimized');
    }

    // Reset
    $textEl.css('height', '');
    $paragraphEl.removeClass('visible');
    $paragraphEl.removeClass('minimized');

    // Mesure number of lines
    let $paragraphHeight = $textEl.height();
    let $lineHeight = parseInt($textEl.css('line-height'));

    let $numberOfLines = $paragraphHeight / $lineHeight;
    console.log($numberOfLines);

    // Set class
    if ($numberOfLines <= 3) {
        $paragraphEl.addClass('visible');
        return true;
    } else {
        if ($minimizeSate) {
            $paragraphEl.addClass('minimized');
        }
        return false;
    }
};

let MesureHeights = () => {
    if ($paragraphEl.hasClass('minimized')) {
        $textMinHeight = $textEl.css('height');
        $paragraphEl.toggleClass('minimized');
        $textMaxHeight = $textEl.css('height');
    }
    else {
        $textMaxHeight = $textEl.css('height');
        $paragraphEl.toggleClass('minimized');
        $textMinHeight = $textEl.css('height');
    }
};

let ToggleParagraph = () => {
    $paragraphEl.toggleClass('minimized');

    if ($paragraphEl.hasClass('minimized')) {
        $textEl.css('height', $textMinHeight);
    }
    else {
        $textEl.css('height', $textMaxHeight);
    }
};

$(document).ready(() => {

    // On load
    if (!IsVisible()) {
        MesureHeights();
        ToggleParagraph();
    }

    // On resize
    let timeout;
    $(window).resize(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (!IsVisible()) {
                MesureHeights();
                ToggleParagraph();
            }
        }, 20);
    });

    // On click
    $buttonElList.on('click', () => {
        ToggleParagraph();
    });
});

