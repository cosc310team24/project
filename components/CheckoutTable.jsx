/*
 * Created on Sun Nov 13 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import Incrementor from "/components/Incrementor.jsx";
import { ButtonGo } from "/components/Button.jsx";
import style from "/styles/CheckoutTable.module.css";
import { TEST_ITEMS } from "/utils/test_order_items.js";

export const CheckoutTable = ({ items }) => {
    const [cartItems, setCartItems] = useState(Object.keys(items));

    useEffect(() => {
        setCartItems(Object.keys(items));
    }, [items]);

    const cart = cartItems.map((i) => {
        return (
            <tr key={i}>
                <td>{TEST_ITEMS[i].name}</td>
                <td>
                    <Incrementor initialValue={parseInt(i)} min={0} />
                </td>
            </tr>
        );
    });

    return (
        <table className={style.checkoutTable}>
            <thead>
                <tr className={style.headerRow}>
                    <th>Item Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>{cart}</tbody>
            <tr>
                <td colspan="2">
                    <ButtonGo p="0 2em" m="0 auto" title="Order Now">
                        Order
                    </ButtonGo>
                </td>
            </tr>
        </table>
    );
};

export default CheckoutTable;
