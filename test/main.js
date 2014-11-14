var test = require('tape');
var Collection = require('ampersand-collection');
var State = require('ampersand-state');
var mixin = require('../ampersand-collection-sort-mixin');
var Stooge = State.extend({
    props: {
        id: 'string',
        firstname: 'string',
        lastname: 'string',
        age: 'number'
    }
});

//test('basics', function (t) {
//    var c = new Collection();
//    var obj = {hey: 'there'};
//    t.ok(c);
//    c.add(obj);
//    t.equals(c.length, 1);
//    t.equals(c.at(0), obj);
//    t.end();
//});

test('single field in array, ascending', function (t) {
    var Coll = Collection.extend(mixin, {
        session: {
            sortProps: ['firstname']
        }
    });
    var c = new Coll();
    var moe = new Stooge({firstname: 'moe', id: '1'});
    var larry = new Stooge({firstname: 'larry', id: '2'});
    var curly = new Stooge({firstname: 'curly', id: '3'});
    c.add([moe, curly, larry]);
    t.equal(c.at(0).firstname, 'curly');
    t.equal(c.at(1).firstname, 'larry');
    t.equal(c.at(2).firstname, 'moe');
    t.end();
});

test('single field as string, ascending', function (t) {
    var Coll = Collection.extend(mixin, {
        session: {
            sortProps: 'firstname'
        }
    });
    var c = new Coll();
    var moe = new Stooge({firstname: 'moe', id: '1'});
    var larry = new Stooge({firstname: 'larry', id: '2'});
    var curly = new Stooge({firstname: 'curly', id: '3'});
    c.add([moe, curly, larry]);
    t.equal(c.at(0).firstname, 'curly');
    t.equal(c.at(1).firstname, 'larry');
    t.equal(c.at(2).firstname, 'moe');
    t.end();
});


test('single field in array, descending', function (t) {
    var Coll = Collection.extend(mixin, {
        session: {
            sortProps: ['firstname'],
            sortDescending: true
        }
    });
    var c = new Coll();
    var moe = new Stooge({firstname: 'moe', id: '1'});
    var larry = new Stooge({firstname: 'larry', id: '2'});
    var curly = new Stooge({firstname: 'curly', id: '3'});
    c.add([moe, curly, larry]);
    t.equal(c.at(0).firstname, 'moe');
    t.equal(c.at(1).firstname, 'larry');
    t.equal(c.at(2).firstname, 'curly');
    t.end();
});

test('multiple fields in array, ascending', function (t) {
    var Coll = Collection.extend(mixin, {
        session: {
            sortProps: ['lastname', 'firstname']
        }
    });
    var c = new Coll();
    var moe = new Stooge({firstname: 'moe', lastname: 'howard', id: '1'});
    var larry = new Stooge({firstname: 'larry', lastname: 'fine', id: '2'});
    var curly = new Stooge({firstname: 'curly', lastname: 'howard', id: '3'});
    var shemp = new Stooge({firstname: 'shemp', lastname: 'howard', id: '4'});
    c.add([moe, larry, curly, shemp]);
    t.equal(c.at(0).firstname, 'larry');
    t.equal(c.at(1).firstname, 'curly');
    t.equal(c.at(2).firstname, 'moe');
    t.equal(c.at(3).firstname, 'shemp');
    t.end();
});

test('multiple fields in array, descending', function (t) {
    var Coll = Collection.extend(mixin, {
        session: {
            sortProps: ['lastname', 'firstname'],
            sortDescending: true
        }
    });
    var c = new Coll();
    var moe = new Stooge({firstname: 'moe', lastname: 'howard', id: '1'});
    var larry = new Stooge({firstname: 'larry', lastname: 'fine', id: '2'});
    var curly = new Stooge({firstname: 'curly', lastname: 'howard', id: '3'});
    var shemp = new Stooge({firstname: 'shemp', lastname: 'howard', id: '4'});
    c.add([moe, larry, curly, shemp]);
    t.equal(c.at(0).firstname, 'shemp');
    t.equal(c.at(1).firstname, 'moe');
    t.equal(c.at(2).firstname, 'curly');
    t.equal(c.at(3).firstname, 'larry');
    t.end();
});

test('numeric field', function (t) {
    var Coll = Collection.extend(mixin, {
        session: {
            sortProps: ['age'],
            sortDescending: false
        }
    });
    var c = new Coll();
    var moe = new Stooge({firstname: 'moe', age: 30, id: '1'});
    var larry = new Stooge({firstname: 'larry', age: 40, id: '2'});
    var curly = new Stooge({firstname: 'curly', age: 35.1, id: '3'});
    var shemp = new Stooge({firstname: 'shemp', age: 35, id: '4'});
    c.add([moe, larry, curly, shemp]);
    t.equal(c.at(0).firstname, 'moe');
    t.equal(c.at(1).firstname, 'shemp');
    t.equal(c.at(2).firstname, 'curly');
    t.equal(c.at(3).firstname, 'larry');
    t.end();
});

test('sort function with single field in array, ascending', function (t) {
    var Coll = Collection.extend(mixin, {
        session: {
            sortProps: ['firstname']
        }
    });
    var c = new Coll();
    var moe = new Stooge({firstname: 'moe', id: '1'});
    var larry = new Stooge({firstname: 'larry', id: '3'});
    var curly = new Stooge({firstname: 'curly', id: '2'});
    c.add([moe, curly, larry]);
    t.equal(c.at(0).firstname, 'curly');
    t.equal(c.at(1).firstname, 'larry');
    t.equal(c.at(2).firstname, 'moe');
    //change sort field
    c.session.sortProps = ['id'];
    t.equal(c.at(0).firstname, 'curly', 'confirm it did not re-sort yet');
    c.sort();
    t.equal(c.at(0).firstname, 'moe');
    t.equal(c.at(1).firstname, 'curly');
    t.equal(c.at(2).firstname, 'larry');
    t.end();
});