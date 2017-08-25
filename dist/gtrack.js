/** 
* @wearejust/gtrack 
* Automatic Google Analytics tracking 
* 
* @version 1.0.3 
* @author Emre Koc <emre.koc@wearejust.com> 
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.init = init;
exports.pageview = pageview;
exports.event = event;
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

var created = void 0;
var options = {
    id: 'UA-XXXXXXXX-X',
    exclude: ''
};

function init(opts) {
    if (!created) {
        created = true;
        if (typeof opts == 'string') opts = { id: opts };
        options = _extends(options, opts || {});
        ga('create', options.id, 'auto');
        pageview();
    }

    $('a[href]:not(.no-gtracking,[href=""],[href^="/"]:not([href^="//"]),[href^="' + location.origin + '"]),[data-gtrack]:not([data-gtrack=""])').not(options.exclude).off('mousedown click', click).on('mousedown click', click);
}

function pageview(url) {
    ga('send', 'pageview', url || location.pathname);
}

function event(category, action, label, value, callback) {
    if ($.isFunction(callback)) {
        callback = {
            'transport': 'beacon',
            'hitCallback': callback
        };
    }
    ga('send', 'event', category, action, label, value, callback);
}

function click(e) {
    if (e.type != 'mousedown' || e.which == 2) {
        if (e.type != 'mousedown') {
            e.preventDefault();
        }

        var item = $(e.currentTarget);
        var category = void 0,
            action = void 0,
            label = void 0,
            value = void 0,
            callback = void 0;

        var track = item.attr('data-gtrack');
        if (track) {
            var _track$split = track.split(',');

            var _track$split2 = _slicedToArray(_track$split, 4);

            category = _track$split2[0];
            action = _track$split2[1];
            label = _track$split2[2];
            value = _track$split2[3];
        } else {
            category = 'Outbound';
            action = 'Click';
            var url = label = item.attr('href');

            if (label.substr(0, 1) == '#') {
                category = 'Anchor';
                label = label.substr(1);
            } else if (label.substr(0, 4) == 'tel:') {
                category = 'Tel';
                label = label.substr(4);
            } else if (label.substr(0, 7) == 'mailto:') {
                category = 'Mail';
                label = label.substr(7);
            }

            callback = function callback() {
                if (e.which == 2 || e.ctrlKey || e.metaKey || item.attr('target') == '_blank') {
                    open(url);
                } else {
                    location = url;
                }
            };
        }

        event(category, action, label, value, callback);
    }
}