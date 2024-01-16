$(document).ready(() => {
    $('.paragraph').each(function () {
        const paragraphEl = $(this);
        const textEl = paragraphEl.find('p');
        const buttonEl = paragraphEl.find('button');

        const displayButton = () => {
            // Stores class state
            const storeClass = paragraphEl.hasClass('minimized');
            const storeHeight = textEl.css('height');
            textEl.css('height', '');

            // Removes class
            if (storeClass) {
                paragraphEl.removeClass('minimized');
            }

            // Counts number of lines
            let textHeight = textEl.height();
            let lineHeight = parseInt(textEl.css('line-height'));
            let numberOfLines = textHeight / lineHeight;

            // Restores class
            if (storeClass) {
                paragraphEl.addClass('minimized');
                textEl.css('height', storeHeight);
            }

            // If more than 3, return true
            return numberOfLines > 3 ? true : false;
        };

        const getMinMax = () => {
            // Stores class state
            const storeClass = paragraphEl.hasClass('minimized');
            const storeHeight = textEl.css('height');
            textEl.css('height', '');

            // Removes class
            if (storeClass) {
                paragraphEl.removeClass('minimized');
            }

            // Stores class state
            const textHeight = textEl.height();
            const lineHeight = parseInt(textEl.css('line-height'));

            // Calculates min and max height
            const min = lineHeight * 3;
            const max = textHeight;

            // Restores class
            if (storeClass) {
                paragraphEl.addClass('minimized');
                textEl.css('height', storeHeight);
            }

            // Returns min and max height
            return { 'min': min, 'max': max };
        };

        const setHeight = (textHeight) => {
            if (paragraphEl.hasClass('minimized')) {
                textEl.css('height', textHeight.min);
                buttonEl.text('Voir plus');
            } else {
                textEl.css('height', textHeight.max);
                buttonEl.text('Voir moins');
            }
        };

        // On load
        if (displayButton()) {
            // Show button
            paragraphEl.removeClass('hide');

            // Sets height
            setHeight(getMinMax());
        } else {
            // Hide button
            paragraphEl.addClass('hide');
        }

        // On resize
        $(window).on('resize', () => {
            if (displayButton()) {
                // Show button
                paragraphEl.removeClass('hide');

                // Sets height
                setHeight(getMinMax());
            } else {
                // Hide button
                paragraphEl.addClass('hide');
            }
        });

        // On click
        buttonEl.on('click', () => {
            // Toggles class
            paragraphEl.toggleClass('minimized');

            // Sets height
            setHeight(getMinMax());
        });
    });
});