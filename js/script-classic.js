$(document).ready(() => {
    $('.classic').each(function () {
        // Initialize elements variables
        const paragraphEl = $(this);
        const textEl = paragraphEl.find('p');
        const buttonEl = paragraphEl.find('button');

        // Initialize heights variables
        const lineHeight = parseInt(textEl.css('line-height'));
        const min = lineHeight * 3;
        let max = undefined;


        const getHeight = () => {
            let hasMinimizedClass = paragraphEl.hasClass('minimized');
            if (hasMinimizedClass) paragraphEl.removeClass('minimized');

            textEl.height('auto');
            max = textEl.height();

            if (hasMinimizedClass) paragraphEl.addClass('minimized');
        };

        const setHeight = () => {
            const hasMinimized = paragraphEl.hasClass('minimized');
            if (hasMinimized) textEl.height(min);
            else textEl.height(max);
        };

        const setTitle = () => {
            const hasMinimized = paragraphEl.hasClass('minimized');
            if (hasMinimized) buttonEl.text('Voir plus');
            else buttonEl.text('Voir moins');
        };

        const display = () => {
            const numberOfLines = max / lineHeight;
            if (numberOfLines > 3) buttonEl.show();
            else buttonEl.hide();
        };

        const toggle = () => {
            paragraphEl.toggleClass('minimized');
        };


        // On load
        getHeight();
        setHeight();
        setTitle();
        display();

        // On resize
        $(window).on('resize', () => {
            getHeight();
            setHeight();
            display();
        });

        // On click
        buttonEl.on('click', () => {
            toggle();
            setHeight();
            setTitle();
        });
    });
});