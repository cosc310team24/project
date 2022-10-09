/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useEffect } from "react";
import { Content, Header } from "/pages/index.jsx";

const Shipments = () => {
    useEffect(() => {
        document.title = "Shipments | Hospital Inventory Management System";
    });
    return (
        <Content>
            <Header title="🏥 Shipments" />
            <p>This is the shipments page.</p>
        </Content>
    );
};

export default Shipments;
