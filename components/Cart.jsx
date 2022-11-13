/*
 * Created on Wed Oct 12 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";
import Cart from "/public/libs/cart.js";
import { FaShoppingCart } from "react-icons/fa";
import {
    Button,
    ButtonGo,
    ButtonDelete,
    ButtonCart,
} from "/components/Button.jsx";
import styles from "../styles/Cart.module.css";

export const CartSymbol = ({ amt }) => {
    return (
        <div className={styles.cartSymbol}>
            <FaShoppingCart className={styles.cartSymbolIcon} />
            <span className={styles.cartSymbolAmt} data-cy="cart-size">
                ({amt})
            </span>
        </div>
    );
};

export const CartListItem = ({ item, itemQty, onDelete }) => {
    const handleDelete = () => {
        console.log(`Attempting to delete item "${item.name}"...`);
        onDelete(item);
    };

    return (
        <li
            data-cy="cart-list-item"
            className={styles.cartListItem + " total-radius"}
        >
            <ButtonDelete
                data-cy="cart-list-item-delete"
                f="10pt"
                w="1.5em"
                h="1.5em"
                title="Delete this item from the cart"
                onClick={handleDelete}
            />
            <span
                className={styles.itemInfo}
            >{`${item.name} (${itemQty})`}</span>
        </li>
    );
};

export const CartBanner = ({
    cart = {},
    onClear = () => {},
    onItemDelete = () => {},
    onUpdate = (c) => {},
}) => {
    const [cartSize, setCartSize] = useState(0);
    const [localCart, setLocalCart] = useState(cart);

    useEffect(() => {
        // const size = Object.keys(cart).length;
        if (cart !== localCart) setLocalCart(cart);
    }, [cart]);

    useEffect(() => {
        //onUpdate(localCart);
        if (onUpdate) onUpdate(localCart);
        const size = Object.values(localCart).reduce((a, b) => a + b[1], 0);
        setCartSize(size);
    }, [localCart]);

    const handleItemDelete = (item) => {
        localDeleteCartItem(item);
        if (onUpdate) onUpdate(localCart);
    };

    const localDeleteCartItem = (item) => {
        let oldLen = Object.keys(localCart).length;

        // Copy state object
        let newCartItems = { ...localCart };
        // newCartItems[item.id] = [item, quantity];

        // Remove item since quantity is 0
        delete newCartItems[item.id];
        console.log(`Locally removed item with id: ${item.id}`);

        // Set to new updated value
        setLocalCart(newCartItems);

        // console.log(orderItems);
    };

    const localClearCart = () => {
        setLocalCart({});
    };

    const itemStrings = Object.keys(localCart).map((key) => {
        const cartItem = localCart[key];
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
        <div data-cy="cart-banner" className={styles.cartBanner}>
            <ul className={styles.cartList}>
                <li
                    className={styles.cartListItem}
                    style={{ border: "1px solid transparent" }}
                >
                    {/* <div className={styles.cartInfo}> */}
                    <ButtonDelete
                        disabled={cartSize === 0}
                        data-cy="cart-clear"
                        onClick={localClearCart}
                        w="4em"
                        m="0"
                        title="Clear cart"
                    />
                </li>
                <li
                    className={styles.cartListItem}
                    style={{ border: "1px solid transparent" }}
                >
                    <ButtonCart
                        amt={cartSize}
                        m="0"
                        link="/checkout"
                        data={cart}
                    />
                </li>
                {itemStrings}
            </ul>
        </div>
    );
};

export default CartBanner;
