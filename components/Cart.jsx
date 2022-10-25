/*
 * Created on Wed Oct 12 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";
import Cart from "/public/libs/cart.js";

export const CartBanner = ({ items, onClear }) => {
    const [cartSize, setCartSize] = useState(0);

    useEffect(() => {
        const size = Object.keys(items).length;
        const total = Object.values(items).reduce((a, b) => a + b[1], 0);
        if (items) setCartSize(total);
    });

    const itemStrings = Object.keys(items).map((key) => {
        const item = items[key];
        return <li key={key}>{`${item[0]} (${item[1]})`}</li>;
    });

    return (
        <div className="cartBanner">
            <div className="cartInfo">
                <button className="uibutton deleteButton" onClick={onClear}>
                    {"\u2715"}
                </button>
                <h2>Cart ({cartSize})</h2>
            </div>
            <ul>{itemStrings}</ul>
        </div>
    );
};

export default CartBanner;
