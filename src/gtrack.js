(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

let $body = $(document.body);
let options = {
    id: 'UA-XXXXXXXX-X',
    exclude: '',
    parseOnInit: true,
    removeUtm: true,
    timeout: 1000
};

export function init(opts) {
    if (typeof(opts) == 'string') opts = {id: opts};
    options = Object.assign(options, opts || {});

    ga('create', options.id, 'auto');
    ga('set', 'anonymizeIp', true);

    ga(function() {
        analyticsLoaded();
    });
}

export function analyticsLoaded()
{
    pageview();

    if (options.removeUtm && location.search && history.replaceState) {
        let search = location.search.replace('?', '');
        search = search.split('&').filter(function(item) {
            return item.substr(0, 4) == 'utm_' ? null : item;
        }).join('&');
        let url = location.href.replace(location.search, (search.length ? '?' : '') + search);
        history.replaceState({ url: url}, '', url);
    }

    if (options.parseOnInit) {
        parse();
    }
}

export function parse(container) {
    if (!container) container = $body;
    let items = container.find(`a[href]:not(.no-gtrack,[href=""],[href^="/"]:not([href^="//"]),[href^="${location.origin}"]),[data-gtrack]:not([data-gtrack=""])`).not(options.exclude);
    items.off('mousedown click', click);
    items.on('mousedown click', click);
}

export function pageview(url) {
    ga('send', 'pageview', {
        location: location.href,
        page: url || location.pathname
    });
}

export function event(category, action, label, value, callback) {
    ga('send', 'event', category, action, label, value, {
        'transport': 'beacon',
        'hitCallback': function() {
            if ($.isFunction(callback)) {
                callback();
                callback = null;
            }
        }
    });

    if (options.timeout) {
        setTimeout(function() {
            if ($.isFunction(callback)) {
                callback();
                callback = null;
            }
        }, options.timeout);
    }
}

function click(e) {
    if (e.type != 'mousedown' || e.which == 2) {
        let item = $(e.currentTarget);

        if (e.type != 'mousedown' && $._data(e.currentTarget, 'events')[e.type].length == 1) {
            e.preventDefault();
        }

        if (item.is('[data-gtrack-once]')) {
            item.off('mousedown click', click);
        }

        let category, action, label, value, callback;
        let url = item.attr('href');

        let track = item.attr('data-gtrack');
        if (track) {
            [category, action, label, value] = track.split(',');

        } else {
            category = 'Outbound';
            action = 'Click';
            label = url;

            if (label.substr(0, 1) == '#') {
                category = 'Anchor';
                label = label.substr(1);
            } else  if (label.substr(0, 4) == 'tel:') {
                category = 'Tel';
                label = label.substr(4);
            } else if (label.substr(0, 7) == 'mailto:') {
                category = 'Mail';
                label = label.substr(7);
            }
        }

        if (e.isDefaultPrevented()) {
            if (e.which == 2 || e.ctrlKey || e.metaKey || item.attr('target') == '_blank') {
                open(url);
            } else {
                callback = function() {
                    location = url;
                };
            }
        }

        event(category, action, label, value, callback);
    }
}