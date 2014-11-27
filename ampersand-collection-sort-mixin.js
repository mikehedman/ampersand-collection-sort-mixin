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
    },

    getSortProps: function() {
        return this.session.sortProps;
    },
    /**
     * sets the properties used to sort by
     * @param {Array | string} sortProps An array of property names, or one property name in a string
     */
    setSortProps: function(sortProps) {
        this.session.sortProps = sortProps;
    },

    getSortDescending: function() {
        return this.session.sortDescending;
    },
    /**
     * @param {boolean} sortDescending  True for a descending sort, false for ascending
     */
    setSortDescending: function(sortDescending) {
        this.session.sortDescending = sortDescending;
    }
};
