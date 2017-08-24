# GTrack
Automatically track outbound links, mailto:, tel: and hashtags. Track custom events with the [data-link] attribute. Includes default Google Analytics pageviews.

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
GTrack.pageview(custom_url);

// Track event( with optional parameters)
GTrack.event(category, action, label, value, callback);
```

### HTML
```html
Track "Test" hashtag as event
<a href="#test">Test</a>

Track custom event, with optional category, action, label and value
<div data-track="category,action,label,value">Custom</div>

Disable tracking
<a href="https://wearejust.com/" class="no-tracking">Just</a>
```

