/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import Content from "/components/Content.jsx";
import OrderPanel from "/components/OrderPanel.jsx";
import { TEST_ITEMS } from "/utils/test_order_items.js";

const Order = () => {
    return (
        <Content title="Order">
            <OrderPanel testOrderItems={TEST_ITEMS} />
        </Content>
    );
};

export default Order;
