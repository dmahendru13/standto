(function () {
    $(function () {
        if ($('body').hasClass('archived-standto-body')) {
            var byline = document.querySelector('.byline');
            var stByline = '<span class="st-byline">' + byline.textContent + '</span>';

            //remove links and byline from standto body, as extracted from json data file
            //archivedLinks.parentNode.removeChild(archivedLinks);
            byline.parentNode.removeChild(byline);

            $(stByline).prependTo('.small');
        } else {
            console.log('Not Archive Page');
        }
    });
})();