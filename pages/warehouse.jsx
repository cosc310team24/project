/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useEffect } from "react";
import { Content, Header } from "/pages/index.jsx";

const Warehouse = () => {
    useEffect(() => {
        document.title = "Warehouse | Hospital Inventory Management System";
    });
    return (
        <Content>
            <Header title="🏥 Warehouse" />
            <p>This is the warehouse page.</p>
        </Content>
    );
};

export default Warehouse;
