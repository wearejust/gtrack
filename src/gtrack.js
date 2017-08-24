(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

let created;
let options = {
    id: 'UA-XXXXXXXX-X',
    exclude: ''
};

export function init(opts) {
    if (!created) {
        created = true;
        options = Object.assign(options, opts || {});
        ga('create', options.id, 'auto');
        pageview();
    }

    $(`a[href]:not(.no-tracking,[href=""],[href^="/"]:not([href^="//"]),[href^="${location.origin}"]),[data-track]:not([data-track=""])`).not(options.exclude).off('mousedown click', click).on('mousedown click', click);
}

export function pageview(url) {
    ga('send', 'pageview', url || location.pathname);
}

export function event(category, action, label, value, callback) {
    if ($.isFunction(callback))  {
        callback = {
            'transport': 'beacon',
            'hitCallback': callback
        }
    }
    ga('send', 'event', category, action, label, value, callback);
}

function click(e) {
    if (e.type != 'mousedown' || e.which == 2) {
        if (e.type != 'mousedown') {
            e.preventDefault();
        }

        let item = $(e.currentTarget);
        let category, action, label, value, callback;

        let track = item.attr('data-track');
        if (track) {
            [category, action, label, value] = track.split(',');

        } else {
            category = 'outbound';
            action = 'click';
            let url = label = item.attr('href');

            if (label.substr(0, 1) == '#') {
                category = 'anchor';
                label = label.substr(1);
            } else  if (label.substr(0, 4) == 'tel:') {
                category = 'tel';
                label = label.substr(4);
            } else if (label.substr(0, 7) == 'mailto:') {
                category = 'mail';
                label = label.substr(7);
            }

            callback = function() {
                if (e.which == 2 || e.ctrlKey || e.metaKey || item.attr('target') == '_blank') {
                    open(url);
                } else {
                    location = url;
                }
            }
        }

        event(category, action, label, value, callback);
    }
}