/*
 * Created on Thu Nov 10 2022
 * Copyright (c) 2022 Connor Doman
 */
import MarkdownRenderer from "/components/MarkdownRenderer.jsx";
import Content from "/components/Content.jsx";

export const OpenSourceInfo = () => {
    return (
        <Content title="Open Source Information">
            <MarkdownRenderer file="/content/open-source.md" />
        </Content>
    );
};

export default OpenSourceInfo;
