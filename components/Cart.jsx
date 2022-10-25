/*
 * Created on Wed Oct 12 2022
 * Copyright (c) 2022 Connor Doman
 */


import { useState, useEffect } from "react";
import Cart from "/public/util/cart.js";
import styles from "../styles/Cart.module.css";

export const CartListItem = ({ item, itemQty, onDelete }) => {
    const handleDelete = () => {
        console.log(`Attempting to delete item "${item.name}"...`);
        onDelete(item);
    };

    return (
        <li className={styles.cartListItem + " total-radius"}>
            <button
                className={"uibutton delete " + styles.deleteButton}
                onClick={handleDelete}
            >
                {"\u2715"}
            </button>
            <span
                className={styles.itemInfo}
            >{`${item.name} (${itemQty})`}</span>
        </li>
    );
};

export const CartBanner = ({ cart, onClear, onItemDelete }) => {
    const [cartSize, setCartSize] = useState(0);

    useEffect(() => {
        const size = Object.keys(cart).length;
        const total = Object.values(cart).reduce((a, b) => a + b[1], 0);
        if (cart) setCartSize(total);
    });

    const handleItemDelete = (item) => {
        // callback to OrderPanel.updateItems(itemId, quantity);
        onItemDelete(item, 0);
    };

    const itemStrings = Object.keys(cart).map((key) => {
        const cartItem = cart[key];
        return (
            <CartListItem
                key={key}
                item={cartItem[0]}
                itemQty={cartItem[1]}
                onDelete={handleItemDelete}
            />
        );
    });

    return (
        <div className={styles.cartBanner}>
            <div className={styles.cartInfo}>
                <button
                    className={"uibutton delete " + styles.deleteButton}
                    onClick={onClear}
                >
                    {"\u2715"}
                </button>
                <h2>Cart ({cartSize})</h2>
            </div>
            <ul className={styles.cartList}>{itemStrings}</ul>
        </div>
    );
};

export default CartBanner;
