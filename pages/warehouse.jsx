import Content from "/components/Content.jsx";
import InventoryPanel from "/components/InventoryPanel.jsx";
import { TEST_ITEMS } from "/utils/test_warehouse.js";

const Warehouse = () => {
    return (
        <Content title="Warehouse">
            <InventoryPanel inventoryItems={TEST_ITEMS} />
        </Content>
    );
};

export default Warehouse;

