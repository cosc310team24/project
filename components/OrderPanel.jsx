/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect, useRef } from "react";
import Incrementor from "/components/Incrementor.jsx";
import CartBanner from "/components/Cart.jsx";
import styles from "/styles/OrderPanel.module.css";

export class OrderItem {
    static priceFormatter = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    });

    static generatedTestItems = (() => {
        let items = [];
        for (let i = 0; i < 100; i++) {
            items.push(
                new OrderItem(i, `Item ${i}`, Math.floor(Math.random() * 100))
            );
        }
        return items;
    })();

    constructor(id, name, price) {
        this.id = id;
        this.name = name;

        this.price = price;
    }

    get priceString() {
        return OrderItem.priceFormatter.format(this.price);
    }

    toString() {
        return `${this.id}. ${this.name}`;
    }
}

export const OrderListItem = ({ item, quantity, onChange }) => {
    const [id, setId] = useState(item.id);
    const [count, setCount] = useState(quantity);

    const it =
        item instanceof OrderItem
            ? item
            : new OrderItem(item.id, item.name, item.price);

    const handleChange = (count) => {
        // console.log(`OrderListItem ${id}: ${count}`);
        //setCount(count);
        console.log(item);
        onChange(item, count);
    };

    const increment = (qty) => {
        handleChange(qty + 1);
    };

    const decrement = (qty) => {
        if (qty > 0) handleChange(qty - 1);
    };

    return (
        <li className={styles.orderItem}>
            <div className={styles.itemImage}></div>
            <span>
                {it.toString()}
                <br />
                {it.priceString}
            </span>
            <Incrementor
                id={it.id}
                value={quantity}
                onChange={handleChange}
                onIncrement={increment}
                onDecrement={decrement}
            />
            <span className={styles.itemTotal}>
                {OrderItem.priceFormatter.format(it.price * quantity)}
            </span>
        </li>
    );
};

export const OrderPanel = ({ orderCallback, testOrderItems }) => {
    const [orderItems, setOrderItems] = useState({});

    const updateItems = (item, quantity) => {
        let oldLen = Object.keys(orderItems).length;
        // Copy state object
        let newOrderItems = { ...orderItems };
        newOrderItems[item.id] = [item, quantity];

        // Remove item if quantity is 0
        if (quantity === 0) {
            delete newOrderItems[item.id];
            console.log(`Successfully removed item with id: ${item.id}`);
        }

        // Set to new updated value
        setOrderItems(newOrderItems);

        // console.log(orderItems);
    };

    const items = testOrderItems?.map((item) => {
        let i = new OrderItem(item.id, item.name, item.price);
        const qty = orderItems[i.id] ? orderItems[i.id][1] : 0;
        return (
            <OrderListItem
                key={i.id}
                item={i}
                onChange={updateItems}
                quantity={qty}
            />
        );
    });

    const handleClear = () => {
        setOrderItems({});
    };

    return (
        <div>
            <CartBanner
                cart={orderItems}
                onClear={handleClear}
                onItemDelete={updateItems}
            />
            <ul className={styles.orderList}>{items}</ul>
        </div>
    );
};

export default OrderPanel;
