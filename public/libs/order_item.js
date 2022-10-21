/*
 * Created on Thu Oct 20 2022
 * Copyright (c) 2022 Connor Doman
 */

export class OrderItem {
    static priceFormatter = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    });

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

default export OrderItem;
