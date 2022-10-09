/**
 * COSC 310 Team 24 Hospital IMS Proof of Concept
 * By Connor Doman
 * 2022-10-05
 */

import Content from "/components/Content.jsx";
import OrderPanel from "/components/OrderPanel.jsx";
import { TEST_ITEMS } from "/public/libs/test_order_items.js";

/**
 * Page content and app entry point
 */

export default function App() {
    return (
        <Content title="Home">
            <OrderPanel testOrderItems={TEST_ITEMS} />
        </Content>
    );
}
