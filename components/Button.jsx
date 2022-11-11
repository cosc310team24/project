/*
 * Created on Thu Nov 10 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";

export const ButtonPlain = ({
    text = "Button",
    disabled = false,
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
        >
            Button
        </button>
    );
};
