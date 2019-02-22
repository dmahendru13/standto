/*global document, require*/

var CustomSelect = require('./globals/modules/CustomSelect'),
    ParallaxImg = require('./globals/modules/ParallaxImage'),
    Subnav = require('./globals/modules/SubNav'),
    Validity = require('./globals/modules/Validity'),
    SideNav = require('./side-nav');

(function () {
    'use strict';

    var header = document.getElementsByClassName('navbar'),
        headerHeight = (header.length) ? header[0].clientHeight : 0,
        customSelect = document.getElementsByClassName('custom-select'),
        form = document.getElementById('sm-account-form'),
        newsList = $('.news-list'),
        flipButtons = $(".flip-btn"),
        items, title, date, description, link, categories, category, categoryLink, newsItem, months, validCategories, tag, flipCard,
        valid, pubDate1, pubDate2;

    if (form) {
        new Validity(
            document.forms['sm-account-form'],
            '',
            false
        );
    }

    // new ParallaxImg(headerHeight);

    if (customSelect.length > 0) {
        new CustomSelect(customSelect[0]);
    }

    if (newsList.length > 0) {
        months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        validCategories = ['content', 'metrics', 'socialmedia'];
        $.ajax({
            // TODO: THIS URL WILL BE COMING FROM API.ARMY.MIL
            url: 'https://api.army.mil/api/v1/digital/feed',
            dataType: 'xml',
            success: function (data) {
                items = $(data).find('item').filter(function (index, item) {
                    // QUICK FIX REMOVED CATEGORY FILTER AT 058faf35088559e6167d9b915d421588afc51ad8
                    return true;
                });

                items = items.slice(0, 3);

                items = items.sort(function (a, b) {
                    pubDate1 = $(a).find('pubDate').text();
                    pubDate2 = $(b).find('pubDate').text();
                    return new Date(pubDate2) - new Date(pubDate1);
                });

                $('.empty').remove();

                $.each(items, function () {
                    title = $(this).find('title').text()
                    date = $(this).find('pubDate').text()
                    description = $(this).find('description').text()
                    link = $(this).find('link').text()
                    categories = $(this).find('category')

                    newsItem = '';
                    newsItem += '<div class="news-item">';
                    newsItem += '<div class="news-inner">';
                    newsItem += '<div class="news-right">';
                    newsItem += '<div class="main-content">';
                    date = new Date(date);
                    date = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
                    newsItem += '<p class="date">' + date + '</p>'
                    newsItem += '<p class="sections">';

                    categories = _.uniq(categories, function (a) {
                        return $(a).text().toLowerCase();
                    });

                    $.each(categories, function () {
                        category = $(this).text().toLowerCase();
                        category = category.trim().replace(' ', '');
                        tag = '';

                        if (validCategories.indexOf(category) > -1) {

                            categoryLink = category.trim().replace(' ', '');

                            if (category === 'socialmedia') {
                                category = 'Social Media';
                            }

                            tag = '<a href="https://www.digitalgov.gov/category/' + categoryLink + '">' + category + '</a>';
                        }

                        newsItem += tag
                    });
                    newsItem += '</p>';
                    newsItem += '<p class="title"><a title="' + title + '" href="' + link + '">' + title + '</a></p>';
                    newsItem += '</div>';
                    newsItem += '<p class="more"><a title="' + title + '" href="' + link + '">READ MORE</a></p>';
                    newsItem += '</div>';
                    newsItem += '</div>';
                    newsItem += '</div>';

                    newsList.append(newsItem);
                });
            }
        });
    }

    //FLIP SOCIAL MEDIA CARDS
    if (flipButtons.length > 0) {
        $(flipButtons).each(function (index) {
            $(this).on('click', function () {
                flipCard = $(this).parent().parent().parent();
                if ($(flipCard).hasClass('applyflip')) {
                    $(flipCard).removeClass('applyflip');
                } else {
                    $(flipCard).addClass('applyflip');
                }
            });
        });
    }

}());