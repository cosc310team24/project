/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect, useRef } from "react";
import styles from "/styles/Incrementor.module.css";

export const Incrementor = ({
    id,
    value,
    onChange,
    onIncrement,
    onDecrement,
    max = Infinity,
    min = 0,
    disabled = false,
}) => {
    // const [count, setCount] = useState(0);
    const [inputCount, setInputCount] = useState(value);
    const [noDecrement, setNoDecrement] = useState(true);
    const [noIncrement, setNoIncrement] = useState(true);
    const countInput = useRef(null);

    useEffect(() => {
        if (value <= min) {
            setNoDecrement(true);
        } else setNoDecrement(false);

        if (value >= max) {
            setNoIncrement(true);
        } else setNoIncrement(false);

        setInputCount(value);
    });

    const handleChange = (e) => {
        const name = e.target.name;
        let cleanVal = e.target.value.replace(/\D/g, "");
        const val = cleanVal === "" ? 0 : parseInt(cleanVal);
        setInputCount(val);

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

        let event = new Event("change", { bubbles: true });
        if (countInput.current) {
            countInput.dispatchEvent(event);
        }
    };

    const increment = () => {
        if (onIncrement) onIncrement(value);
    };

    const decrement = () => {
        if (onDecrement) onDecrement(value);
    };

    return (
        <div className={styles.incrementor}>
            <button
                name="decrement"
                className={"uibutton left-radius " + styles.incButton}
                onClick={handleClick}
                disabled={noDecrement || disabled}
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
                disabled={disabled}
            />
            <button
                name="increment"
                className={"uibutton right-radius " + styles.incButton}
                onClick={handleClick}
                disabled={noIncrement || disabled}
            >
                {"\u002b"}
            </button>
        </div>
    );
};

export default Incrementor;
