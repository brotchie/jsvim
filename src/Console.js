
var Console = function(div, width, height) {
    // Number of text column.
    this.width = width;

    // Number of text rows.
    this.height = height;

    // Span elements are added to this div.
    this._div = div;

    // The span element for each row.
    this._rows = [];

    // Text content of each row stored as an array
    // of arrays.
    this._rowContent = [];

    // Rows marked as dirty to be redrawn next cycle.
    this._dirty = [];

    // Creates a blank row with n elements.
    var blankRow = function(n) {
        return _.range(n).map(function(){
            return ' ';
        });
    }

    // Initializes the console area.
    _.times(height, function() {
        var span = $('<span style="white-space: pre;"/>');

        this._rows.push(span);
        this._rowContent.push(blankRow(this.width));

        this._div.append(span);
        this._div.append($('<br/>'));
    }, this);

    // Draws a string at a given row and column.
    this.drawString = function(row, col, value) {
        _.each(_.range(value.length), function(i) {
            this._rowContent[row][i + col] = value[i];
        }, this);
        this._dirty.push(row);
    }

    // Updates the console area with any pending
    // updates.
    this.update = function() {
        var dirty = _.unique(this._dirty);
        this._dirty = [];

        _.each(dirty, function(row) {
            this._rows[row].text(this._rowContent[row].join(''));
        }, this);
    }
}
