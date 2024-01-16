$(document).ready(() => {
    $('.paragraph').each(function () {
        const paragraphEl = $(this);
        const textEl = paragraphEl.find('p');
        const buttonEl = paragraphEl.find('button');

        let currentClass = undefined;
        minHeight = undefined;
        maxHeight = undefined;

        const resets = () => {
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
            // Restores class if it existed
            if (currentClass) {
                paragraphEl.addClass('minimized');
            }
        };

        const displayButton = () => {
            // Counts number of lines
            let textHeight = textEl.height();
            let lineHeight = parseInt(textEl.css('line-height'));
            let numberOfLines = textHeight / lineHeight;

            return numberOfLines > 3 ? true : false;
        };

        const getHeight = () => {
            let textHeight = textEl.height();
            let lineHeight = parseInt(textEl.css('line-height'));

            // Calculates min and max height
            minHeight = lineHeight * 3;
            maxHeight = textHeight;

            console.log('Min :', minHeight);
            console.log('Max :', maxHeight);
        };

        const setHeight = () => {
            if (paragraphEl.hasClass('minimized')) {
                textEl.css('height', minHeight);
            } else {
                textEl.css('height', maxHeight);
            }
        };

        const setButtonName = () => {
            if (paragraphEl.hasClass('minimized')) {
                buttonEl.text('Voir plus');
            } else {
                buttonEl.text('Voir moins');
            }
        };


        // On load
        resets();
        getHeight();
        restores();
        setHeight();
        setButtonName();
        if (displayButton()) {
            buttonEl.show();
        } else {
            buttonEl.hide();
        }

        // On resize
        $(window).on('resize', () => {
            resets();
            getHeight();
            restores();
            setHeight();
            setButtonName();
            if (displayButton()) {
                buttonEl.show();
            } else {
                buttonEl.hide();
            }
        });

        // On click
        buttonEl.on('click', () => {
            paragraphEl.toggleClass('minimized');

            setHeight();
            setButtonName();
        });
    });
});