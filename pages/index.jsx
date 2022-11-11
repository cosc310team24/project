/**
 * COSC 310 Team 24 Hospital IMS Proof of Concept
 * By Connor Doman
 * 2022-10-05
 */

import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import { useState, useEffect, useRef } from "react";
import MarkdownRenderer from "/components/MarkdownRenderer.jsx";

/**
 * Page content and app entry point
 */

export default function App() {
    useEffect(() => {}, []);

    return (
        <Content title="Home">
            <MarkdownRenderer file="/content/homepage.md" />
        </Content>
    );
};

export default App;
