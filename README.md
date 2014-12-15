# ampersand-collection-rest-mixin

A mixin for extending [ampersand-collection](https://github.com/AmpersandJS/ampersand-collection) with the ability to sort by multiple properties, and ascending/descending.  The sorting is performed when adding new models to the collection, or when the sort() method is called.

## install

```
npm install ampersand-collection-sort-mixin
```

## usage
The mixin uses two properties stored in session properties:
* sortProps - Array of strings, or string.  An array of the property names to sort the collection by.  If just one, it can be just a string.
* sortDescending - Boolean.  Set to true to sort descending. Default is false (ascending)
## example

```javascript
var Collection = require('ampersand-collection');
var sortMixin = require('ampersand-collection-sort-mixin');


module.exports = Collection.extend(sortMixin, {
    session: {
        sortProps: ['lastname', 'firstname'],
        sortDescending: true
    },

});
```

## credits

The main nugget of this code came from the base collection sort() method.

## license

MIT
