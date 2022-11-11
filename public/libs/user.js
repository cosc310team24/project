/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */

import Cart from "./cart.js";
import Generator from "/utils/generators.js";

export class User {
    constructor(id, first, last, email, permission = 0, cart = new Cart()) {
        this.id = id;
        this.firstName = first;
        this.lastName = last;
        this.email = email;
        this.permission = permission;
        this.cart = cart;
    }

    register(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    addToCart(item, quantity) {
        this.cart.addAmount(item, quantity);
    }

    removeFromCart(item, quantity) {
        this.cart.removeAmount(item, quantity);
    }

    get cartItems() {
        return this.cart.itemList;
    }
}

export default User;
