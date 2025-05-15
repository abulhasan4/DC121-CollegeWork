let person = {
    name: "Abul",
    sayHello: function() {
        console.log("Hello my name is " + this.name);
    }
};

person.sayHello();
