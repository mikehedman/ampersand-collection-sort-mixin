/**
 * Created by mike on 11/13/14.
 */
var extend = require('extend-object');

module.exports = {
    session: {
        sortDescending: false,
        sortProps: []
    },

    comparator: function (left, right) {
        //if they just gave a string, convert it to an array
        if (typeof this.session.sortProps === 'string') {
            this.session.sortProps = [this.session.sortProps]
        }

        var direction = this.session.sortDescending === true ? -1 : 1;
        var leftValue, rightValue;
        for (var i = 0; i < this.session.sortProps.length; i++) {
            var prop = this.session.sortProps[i];
            if (left.get) {
                leftValue = left.get(prop);
                rightValue = right.get(prop);
            } else {
                leftValue = left[prop];
                rightValue = right[prop];
            }
            if (leftValue > rightValue || leftValue === void 0) return direction;
            if (leftValue < rightValue || rightValue === void 0) return -1 * direction;
        }
        //if it got this far, they are equal
        return 0;
    }

};
