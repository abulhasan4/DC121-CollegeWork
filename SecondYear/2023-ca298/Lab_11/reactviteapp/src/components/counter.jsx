import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <button onClick={incrementCount}>Increment</button>
            <p>Count: {count}</p>
        </div>
    );
}

export default Counter;
