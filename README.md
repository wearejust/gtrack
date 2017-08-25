# GTrack
Automatically track outbound links, mailto:, tel: and hashtags. Track custom events with the [data-glink] attribute. Includes default Google Analytics pageviews.

### Installation
```
npm install @wearejust/gtrack --save
```

### Usage
```javascript
var GTrack = require('@wearejust/gtrack');

$(function() {
    GTrack.init('UA-XXXXXXXX-X');
});
```

#### With options
```javascript
var GTrack = require('@wearejust/gtrack');

$(function() {
    GTrack.init({
        id: 'UA-XXXXXXXX-X',    // Google Analytics id
        exclude: ''             // jQuery selector to exclude
    });
});
```

### Methods
```javascript
// Track current location
GTrack.pageview();

// Track custom url
GTrack.pageview(custom_url, callback);

// Track event with category and cation, and optional label, value and callback
GTrack.event(category, action, label, value, callback);
```

### HTML
```html
Automatic inbound and outbound tracking (no extra class required)
<a href="/contact">Contact</a>
<a href="https://wearejust.com/">Just</a>

Track 'Test' as 'Anchor' event
<a href="#test">Test</a>

Track 'emre.koc@wearejust.com' as 'Mail' event
<a href="mailto:emre.koc@wearejust.com">Mail</a>

Track custom event, with optional category, action, label and value
<button data-gtrack="Category,Action,Label,value">Custom</button>

Disable tracking
<a href="https://wearejust.com/" class="no-gtracking">Just</a>
```

