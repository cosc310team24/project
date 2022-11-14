/*
 * Created on Mon Nov 14 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect, Children } from "react";
import styles from "/styles/TextBox.module.css";

export const TextBox = ({
    children,
    disabled = false,
    name = "uibutton",
    color = "#0069ed",
    f = "12pt",
    h = "2em",
    w = "auto",
    m = "0.25em",
    p = "0.5em",
    title = "",
    style = {},
    onChange = (e) => {},
    ...props
}) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        if (onChange) onChange(value);
    }, [value]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <input
            className={styles.input}
            type="text"
            style={{
                ...props.style,
                width: w,
                height: h,
                margin: m,
                padding: p,
                fontSize: f,
            }}
            onChange={(e) => {
                handleChange(e);
            }}
            placeHolder={props.placeHolder}
            {...props}
        />
    );
};

export default TextBox;
