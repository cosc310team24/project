import Content from "/components/Content.jsx";
import InventoryPanel from "/components/InventoryPanel.jsx";
import { testInventoryItems } from "/components/InventoryPanel.jsx";

const Warehouse = () => {
    return (
        <Content title="Warehouse">
            <InventoryPanel inventoryItems={testInventoryItems} />
        </Content>
    );
};

export default Warehouse;

