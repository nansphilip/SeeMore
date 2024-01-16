$(document).ready(() => {
    $('.paragraph').each(function () {
        const paragraphEl = $(this);
        const textEl = paragraphEl.find('p');
        const buttonEl = paragraphEl.find('button');

        let currentClass = undefined;
        let currentHeight = undefined;
        minHeight = undefined;
        maxHeight = undefined;

        const resets = () => {
            // Stores current height
            currentHeight = textEl.height();

            // Resets height
            textEl.css('height', '');

            // Stores current state
            currentClass = paragraphEl.hasClass('minimized');

            // Removes class if it exists
            if (currentClass) {
                paragraphEl.removeClass('minimized');
            }
        };

        const restores = () => {
            // Restores height
            textEl.css('height', currentHeight);

            // Restores class if it existed
            if (currentClass) {
                paragraphEl.addClass('minimized');
            }
        };

        const displayButton = () => {
            resets();

            // Counts number of lines
            let textHeight = textEl.height();
            let lineHeight = parseInt(textEl.css('line-height'));
            let numberOfLines = textHeight / lineHeight;

            // Displays button if the text is greater than 3 lines
            if (numberOfLines > 3) {
                buttonEl.show();
            } else {
                buttonEl.hide();
            }

            restores();
        };

        const getHeight = () => {
            resets();

            // Calculates min and max height
            let textHeight = textEl.height();
            let lineHeight = parseInt(textEl.css('line-height'));
            minHeight = lineHeight * 3;
            maxHeight = textHeight;

            restores();
        };

        const setHeight = () => {
            if (paragraphEl.hasClass('minimized')) {
                textEl.css('height', minHeight);
            } else {
                textEl.css('height', maxHeight);
            }
        };

        // Sets button name
        const setButtonName = () => {
            if (paragraphEl.hasClass('minimized')) {
                buttonEl.text('Voir plus');
            } else {
                buttonEl.text('Voir moins');
            }
        };


        // On load
        getHeight();
        setHeight();
        setButtonName();
        displayButton();

        // On resize
        let timeout;
        $(window).on('resize', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                console.log('Resize');
                getHeight();
                setHeight();
                setButtonName();
                displayButton();
            }, 100);
        });

        // On click
        buttonEl.on('click', () => {
            // Toggles class
            paragraphEl.toggleClass('minimized');

            setHeight();
            setButtonName();
        });
    });
});