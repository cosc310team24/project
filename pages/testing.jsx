/*
 * Created on Thu Nov 10 2022
 * Copyright (c) 2022 Connor Doman
 */
import Content from "/components/Content.jsx";
import MarkdownRenderer from "/components/MarkdownRenderer.jsx";

const Testing = () => {
    return (
        <Content title="Testing">
            <MarkdownRenderer file="/content/testing.md" />
        </Content>
    );
};

export default Testing;
