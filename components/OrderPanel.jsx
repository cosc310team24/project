/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

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

        this.price = OrderItem.priceFormatter.format(price);
    }

    toString() {
        return `${this.id}. ${this.name}\n${this.price}`;
    }
}

export const OrderListItem = ({ item }) => {
    let it =
        item instanceof OrderItem
            ? item
            : new OrderItem(item.id, item.name, item.price);
    return (
        <li className="orderItem">
            <div className="itemImage"></div>
            <p>{it.toString()}</p>
        </li>
    );
};

export const OrderPanel = ({ testOrderItems }) => {
    const items = testOrderItems?.map((item) => {
        let i = new OrderItem(item.id, item.name, item.price);
        return <OrderListItem key={item.id} item={item} />;
    });
    return <ul className="orderList">{items}</ul>;
};

export default OrderPanel;
