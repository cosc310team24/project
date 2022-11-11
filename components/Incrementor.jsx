/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect, useRef } from "react";
import { Button, ButtonDecr, ButtonIncr } from "/components/Button.jsx";
import styles from "/styles/Incrementor.module.css";

export const Incrementor = ({
    id,
    initialValue = 0,
    value,
    onChange = undefined,
    onIncrement,
    onDecrement,
    max = Infinity,
    min = -Infinity,
    ...props
}) => {
    // const [count, setCount] = useState(0);
    const [inputCount, setInputCount] = useState(parseInt(initialValue));
    const [noDecrement, setNoDecrement] = useState(false);
    const [noIncrement, setNoIncrement] = useState(false);
    const qtyInput = useRef(null);

    useEffect(() => {
        if (inputCount <= min) setNoDecrement(true);
        else setNoDecrement(false);

        if (inputCount >= max) setNoIncrement(true);
        else setNoIncrement(false);

        //if (value) setInputCount(value);
        if (onChange) {
            onChange(inputCount);
        }
        updateCountFromInput(qtyInput.current);
    }, [inputCount]);

    const handleInputChange = (e) => {
        updateCountFromInput(e.target);
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

        // updateCountFromInput(qtyInput.current);
    };

    const updateCountFromInput = (elem) => {
        const name = elem.name;
        let cleanVal = elem.value.replace(/\D/g, "");
        const val = cleanVal === "" ? 0 : parseInt(cleanVal);
        setInputCount(val);

        console.warn("handleChange... -> " + val);

        // // console.log(`Incrementor ${id}: ${name} = ${val}`);
        // if (!onChange) {
        //     console.log("No onChange handler");
        //     return;
        // }

        // if (name == id) {
        //     console.log(`Incrementor: onChange(${val})...`);
        //     onChange(val);
        // }
    };

    const increment = () => {
        console.log("Increment");
        if (noIncrement) return;

        setInputCount(inputCount + 1);
    };

    const decrement = () => {
        console.log("Decrement");

        if (noDecrement) return;
        setInputCount(inputCount - 1);
    };

    return (
        <div className={styles.incrementor} style={props.style}>
            <ButtonDecr decr={decrement} noDecr={noDecrement} m="0" />
            <input
                name={id}
                className={styles.count}
                type="text"
                value={value ? value : inputCount}
                onChange={handleInputChange}
                ref={qtyInput}
                data-cy="counter"
            />
            <ButtonIncr incr={increment} noIncr={noIncrement} m="0" />
        </div>
    );
};

export default Incrementor;
