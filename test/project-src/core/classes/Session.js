"use strict";
// Exports
var Session = (function () {
    function Session(keyOrSize) {
        if (typeof keyOrSize == 'string') {
            this.key = keyOrSize;
        }
        else {
            var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxys1234567890';
            this.key = '';
            for (var n = 0; n < keyOrSize; n++) {
                this.key += abc[Math.floor(Math.random() * abc.length)];
            }
        }
    }
    return Session;
}());
exports.Session = Session;
;
