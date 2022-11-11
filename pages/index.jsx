/**
 * COSC 310 Team 24 Hospital IMS Proof of Concept
 * By Connor Doman
 * 2022-10-05
 */

import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import Account from "/components/Account.jsx";

/**
 * Page content and app entry point
 */

export const App = () => {
    return (
        <Content title="Home">
            <TextColumn></TextColumn>
        </Content>
    );
};

export default App;
