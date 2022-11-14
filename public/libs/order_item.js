/*
 * Created on Thu Oct 20 2022
 * Copyright (c) 2022 Connor Doman
 */

export const asPrice = (value) => {
    return OrderItem.priceFormatter.format(value);
};

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
        return asPrice(this.price);
    }

    priceMultipleStr(quantity) {
        return asPrice(this.price * quantity);
    }

    toString() {
        return `${this.id}. ${this.name}`;
    }
}

export default OrderItem;
