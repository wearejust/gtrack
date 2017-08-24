# GTrack

### Installation
```
npm install @wearejust/gtrack --save
```

### Usage
```javascript
var GTrack = require('@wearejust/gtrack');

$(function() {
    GTrack.init();
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
