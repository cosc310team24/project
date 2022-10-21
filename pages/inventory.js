import { useEffect } from "react";
import Content from "/components/Content.jsx";
import Header from "/components/Header.jsx";
import TextColumn from "/components/TextColumn.jsx";

const Inventory = () => {
    return (
        <Content title="Inventory">
            <TextColumn text="This is the inventory page." />{" "}
        </Content>
    );
};

export default Inventory;
