/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useEffect } from "react";
import Content from "/components/Content.jsx";
import Header from "/components/Header.jsx";
import TextColumn from "/components/TextColumn.jsx";

const Warehouse = () => {
    return (
        <Content title="Warehouse">
            <TextColumn text="This is the warehouse page." />{" "}
        </Content>
    );
};

export default Warehouse;
