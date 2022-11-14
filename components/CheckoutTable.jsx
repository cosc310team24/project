/*
 * Created on Sun Nov 13 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import Incrementor from "/components/Incrementor.jsx";
import { ButtonGo } from "/components/Button.jsx";
import OrderItem, { asPrice } from "/public/libs/order_item.js";
import style from "/styles/CheckoutTable.module.css";
import { TEST_ITEMS } from "/utils/test_order_items.js";

export const CheckoutTable = ({ items }) => {
    console.log(items);
    const [cartData, setCartData] = useState(items);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);

    useEffect(() => {
        setCartData(items);
    }, [items]);

    useEffect(() => {
        console.log(`cartData: ${JSON.stringify(cartData)}`);
        let tPrice = 0;
        let tQty = 0;

        for (let i of Object.keys(cartData)) {
            tPrice += cartData[i][0].price * cartData[i][1];
            tQty += cartData[i][1];
        }
        setTotalPrice(tPrice);
        setTotalQty(tQty);
    }, [cartData]);

    const updateData = (itemId, newQty) => {
        let newCartData = { ...cartData };
        newCartData[itemId][1] = newQty;
        setCartData(newCartData);
    };

    // Create table rows
    const cart = Object.keys(cartData).map((i) => {
        let item = new OrderItem(i, TEST_ITEMS[i].name, TEST_ITEMS[i].price);
        let qty = cartData[i][1];
        // console.log(cartData[i][0].price);

        return (
            <tr key={i}>
                <td className={style.itemName}>{item.name}</td>
                <td className={style.itemPrice}>
                    {qty} x {item.priceString}
                    <br />
                    <strong> = {item.priceMultipleStr(qty)}</strong>
                </td>
                <td className={style.itemQty}>
                    <Incrementor
                        initialValue={qty}
                        min={0}
                        onChange={(qty) => {
                            updateData(i, qty);
                        }}
                    />
                </td>
            </tr>
        );
    });

    // Render
    return (
        <table className={style.checkoutTable}>
            <thead>
                <tr className={style.headerRow}>
                    <th className={style.itemName}>Item Name</th>
                    <th className={style.itemPrice}>Price</th>
                    <th className={style.itemQty}>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {cart}
                <tr>
                    <td className={style.itemName}>
                        <strong>Total:</strong>
                    </td>
                    <td className={style.itemPrice}>{asPrice(totalPrice)}</td>
                    <td className={style.itemQty}>
                        <ButtonGo
                            w="100%"
                            m="0 auto"
                            title="Order Now"
                            disabled={totalQty === 0 || isNaN(totalPrice)}
                        >
                            Order ({totalQty})
                        </ButtonGo>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default CheckoutTable;
