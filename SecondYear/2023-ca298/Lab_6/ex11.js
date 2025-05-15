function printer(callback, a, b) {
    console.log(callback(a, b));
}

function add(a, b) {
    return a + b;
}

printer(add, 5, 3);
