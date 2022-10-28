/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect, useRef } from "react";
import styles from "/styles/Incrementor.module.css";

export const Incrementor = ({
    id,
    value = 0,
    onChange = undefined,
    onIncrement,
    onDecrement,
    max = Infinity,
    min = -Infinity,
}) => {
    // const [count, setCount] = useState(0);
    const [inputCount, setInputCount] = useState(parseInt(value));
    const [noDecrement, setNoDecrement] = useState(false);
    const [noIncrement, setNoIncrement] = useState(false);
    const countInput = useRef(null);

    useEffect(() => {
        if (inputCount <= min) setNoDecrement(true);
        else setNoDecrement(false);

        if (inputCount >= max) setNoIncrement(true);
        else setNoIncrement(false);

        //setInputCount(value);
    }, [inputCount]);

    const handleChange = (e) => {
        if (!onChange) return;

        const name = e.target.name;
        let cleanVal = e.target.value.replace(/\D/g, "");
        const val = cleanVal === "" ? 0 : parseInt(cleanVal);
        setInputCount(val);

        console.warn("handleChange... -> " + val);

        // console.log(`Incrementor ${id}: ${name} = ${val}`);

        if (name == id) {
            onChange(val);
        }
    };

    const handleClick = (e) => {
        // Dispatch change event

        const name = e.target.name;
        if (name === "increment") {
            increment();
        } else if (name === "decrement") {
            decrement();
        } else {
            console.error("Unknown button name");
        }

        // let event = new Event("change", { bubbles: true });
        // if (countInput.current) {
        //     countInput.dispatchEvent(event);
        // }
    };

    const increment = () => {
        console.log("Increment");
        if (noIncrement) return;

        console.log("\tinputCount before: " + inputCount);
        if (onIncrement) onIncrement(value);
        else setInputCount(inputCount + 1);

        console.log("\tinputCount after: " + inputCount);
    };

    const decrement = () => {
        console.log("Decrement");
        if (noDecrement) return;

        console.log("\tinputCount before: " + inputCount);
        if (onDecrement) onDecrement(value);
        else setInputCount(inputCount - 1);
        console.log("\tinputCount after: " + inputCount);
    };

    return (
        <div className={styles.incrementor}>
            <button
                name="decrement"
                className={"uibutton left-radius " + styles.incButton}
                onClick={decrement}
                disabled={noDecrement}
            >
                {"\u2013"}
            </button>
            <input
                name={id}
                className={styles.count}
                type="text"
                value={inputCount}
                onChange={handleChange}
                ref={(input) => (countInput = input)}
                data-cy="counter"
            />
            <button
                name="increment"
                className={"uibutton right-radius " + styles.incButton}
                onClick={increment}
                disabled={noIncrement}
            >
                {"\u002b"}
            </button>
        </div>
    );
};

export default Incrementor;
