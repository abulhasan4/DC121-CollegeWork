let person = {
    name: "Abul",
    age: 19,
    address: "Dublin"
};

for (let key in person) {
    console.log(key + ": " + person[key]);
}
