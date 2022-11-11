/*
 * Created on Thu Nov 10 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTimes, FaShoppingCart } from "react-icons/fa";
import styles from "/styles/Button.module.css";

export const UIButton = ({
    children,
    disabled = false,
    name = "uibutton",
    color = "#0069ed",
    f = "12pt",
    h = "2em",
    w = "auto",
    m = "0.25em",
    title = "",
    style = {},
    ...props
}) => {
    const handleClick = (e) => {
        if (!disabled && props.onClick) props.onClick(e);
    };

    return (
        <button
            name={name}
            className={styles.button}
            onClick={handleClick}
            disabled={disabled}
            style={{
                ...style,
                backgroundColor: disabled ? "grey" : color,
                height: h,
                width: w,
                margin: m,
                fontSize: f,
            }}
            title={title}
        >
            {children}
        </button>
    );
};

export const Button = (props) => {
    return <UIButton name={props.name || "button"} {...props} />;
};

export const ButtonGo = (props) => {
    return (
        <Button
            // disabled={props.disabled}
            name="buttonGo"
            color="green"
            h="2.75em"
            {...props}
        />
    );
};

export const ButtonDelete = (props) => {
    return (
        <Button
            name="buttonDelete"
            color="#ed0000"
            h="2.75em"
            w="2.75em"
            m="0.5em"
            {...props}
        >
            <FaTimes />
        </Button>
    );
};

export const ButtonCart = ({ amt, onClick = () => {}, ...props }) => {
    return (
        <ButtonGo
            name="buttonCart"
            onClick={onClick}
            disabled={amt === 0}
            title="Checkout with this cart"
            {...props}
        >
            <FaShoppingCart className={styles.cartSymbolIcon} />
            <span className={styles.cartSymbolAmt} data-cy="cart-size">
                ({amt})
            </span>
        </ButtonGo>
    );
};

export const ButtonIncr = ({
    onClick = () => {},
    noIncr = false,
    incr = () => {},
    ...props
}) => {
    return (
        <UIButton
            name="buttonIncrement"
            style={{
                borderRadius: "0 0.25em 0.25em 0",
                width: "100%",
            }}
            onClick={incr}
            disabled={noIncr}
            m="0"
            f="1em"
        >
            <FaPlus />
        </UIButton>
    );
};

export const ButtonDecr = ({
    onClick = () => {},
    noDecr = false,
    decr = () => {},
    ...props
}) => {
    return (
        <UIButton
            name="buttonDecrement"
            style={{
                borderRadius: "0.25em 0 0 0.25em",
                width: "100%",
            }}
            onClick={decr}
            disabled={noDecr}
            m="0"
            f="1em"
            h="2em"
        >
            <FaMinus />
        </UIButton>
    );
};
