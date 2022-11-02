import OrderPanel from "/components/OrderPanel";

describe("OrderPanel.cy.js", () => {
    it("mounts", () => {
        cy.mount(<OrderPanel />);
    });
});
