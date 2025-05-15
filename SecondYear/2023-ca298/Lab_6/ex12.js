function printer(callback, a, b) {
    console.log(callback(a, b));
}

printer(function(a, b) {
    return a + b;
}, 5, 3);
