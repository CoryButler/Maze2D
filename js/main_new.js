function modulo(n, m) {
    return ((n % m) + m) % m;
}

function invertJson(input) {
    var one, output = {};
    for (one in input) {
        if (input.hasOwnProperty(one)) {
            output[input[one]] = one;
        }
    }
    return output;
}

new Game();