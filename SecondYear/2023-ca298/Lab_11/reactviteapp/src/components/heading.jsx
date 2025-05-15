const greetings = [
    "how are you",
    "how's it going",
    "where were you when the Westfold fell",
    "DId yOU pUT YOUr NAmE iN The goBlet Of fIRE",
    "this is the way",
    "I was there the day Horus slew the Emperor"
];

function HeadingComponent({ name }) {
    const sayHello = () => {
        let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        return `Hello ${name}, ${randomGreeting}`;
    };

    return (
        <div>
            <h1>{sayHello()}</h1>
        </div>
    );
}

export default HeadingComponent;
