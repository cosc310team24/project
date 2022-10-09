/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useEffect } from "react";
import { Content, Header } from "/pages/index.jsx";

const Order = () => {
    useEffect(() => {
        document.title = "Order | Hospital Inventory Management System";
    });
    return (
        <Content>
            <Header title="🏥 Order" />
            <p>This is the order page.</p>
        </Content>
    );
};

export default Order;
