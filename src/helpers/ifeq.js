module.exports = function( a, b, options) {
    console.log(a, b, options);
    if(a === b) {
        return options.fn(this);
    }
    return options.inverse(this);
};