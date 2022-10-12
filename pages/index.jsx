/**
 * COSC 310 Team 24 Hospital IMS Proof of Concept
 * By Connor Doman
 * 2022-10-05
 */

import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";

/**
 * Page content and app entry point
 */

export default function App() {
    return (
        <Content title="Home">
            <TextColumn text="Welcome to this IMS." />
        </Content>
    );
}
