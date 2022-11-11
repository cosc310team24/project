/*
 * Created on Thu Nov 10 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "/styles/Button.module.css";

export const UIButton = ({
    children,
    disabled = false,
    color = "#0069ed",
    f = "12pt",
    h = "2em",
    w = "auto",
    m = "0.25em",
    onClick = () => {},
}) => {
    const handleClick = (e) => {
        onClick(e);
    };

    return (
        <button
            className={styles.button}
            onClick={handleClick}
            disabled={disabled}
            style={{
                backgroundColor: disabled ? "grey" : color,
                height: h,
                width: w,
                margin: m,
                fontSize: f,
            }}
        >
            {children}
        </button>
    );
};

export const Button = (props) => {
    return <UIButton {...props} />;
};

export const ButtonGo = (props) => {
    return (
        <UIButton
            // disabled={props.disabled}
            color="green"
            h="2.75em"
            {...props}
        />
    );
};

export const ButtonDelete = (props) => {
    return (
        <UIButton color="#ed0000" h="2.75em" w="2.75em" m="0.5em" {...props}>
            <FaTimes />
        </UIButton>
    );
};
