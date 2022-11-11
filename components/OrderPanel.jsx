/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect, useRef, StrictMode } from "react";
import Incrementor from "/components/Incrementor.jsx";
import CartBanner from "/components/Cart.jsx";
import OrderItem from "/public/libs/order_item.js";
import styles from "/styles/OrderPanel.module.css";

export const OrderListItem = ({ item, onChange, update = false }) => {
    const [id, setId] = useState(item.id);
    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(0);

    const it =
        item instanceof OrderItem
            ? item
            : new OrderItem(item.id, item.name, item.price);

    const handleChange = (qty) => {
        // console.log(`OrderListItem ${id}: ${count}`);
        setCount(qty);
        setPrice(it.price * qty);
        console.log(item);
        // onChange(item, qty);
    };

    const handleClick = () => {
        onChange(item, count);
    };

    return (
        <li data-cy="order-list-item" className={styles.orderItem}>
            <div className={styles.itemImage}></div>
            <span>
                {it.toString()}
                <br />
                {it.priceString}
            </span>
            <Incrementor id={it.id} onChange={handleChange} min={0} />
            <span className={styles.itemTotal}>
                {OrderItem.priceFormatter.format(price)}
            </span>
            <button
                name="add"
                className={`${styles.addButton} uibutton`}
                onClick={handleClick}
                disabled={count <= 0}
            >
                {update && count > 0 ? "Update" : "Add"}
            </button>
        </li>
    );
};

export const OrderPanel = ({ orderCallback, testOrderItems }) => {
    const [cartItems, setCartItems] = useState({});
    const [orderableItems, setOrderableItems] = useState(testOrderItems);

    const updateItems = (item, quantity) => {
        let oldLen = Object.keys(cartItems).length;
        // Copy state object
        let newCartItems = { ...cartItems };
        newCartItems[item.id] = [item, quantity];

        // Remove item if quantity is 0
        if (quantity === 0) {
            delete newCartItems[item.id];
            console.log(`Successfully removed item with id: ${item.id}`);
        }

        // Set to new updated value
        setCartItems(newCartItems);

        // console.log(orderItems);
    };

    const handleCartUpdate = (cart) => {
        setCartItems(cart);
    };

    const deleteOneItem = (item) => {
        updateItems(item, 0);
    };

    const items = orderableItems?.map((item) => {
        let i = new OrderItem(item.id, item.name, item.price);
        const qty = cartItems[i.id] ? cartItems[i.id][1] : 0;
        return (
            <OrderListItem
                key={i.id}
                item={i}
                onChange={updateItems}
                update={qty > 0}
            />
        );
    });

    const handleClear = () => {
        setCartItems({});
    };

    return (
        <div data-cy="order-panel">
            <p>{JSON.stringify(cartItems)}</p>
            <CartBanner
                cart={cartItems}
                onClear={handleClear}
                // onItemDelete={deleteOneItem}
                onUpdate={handleCartUpdate}
            />
            <ul className={styles.orderList}>
                <StrictMode>{items}</StrictMode>
            </ul>
        </div>
    );
};

export default OrderPanel;
