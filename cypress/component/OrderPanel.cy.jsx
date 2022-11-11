import OrderPanel from "/components/OrderPanel";
import { TEST_ITEMS } from "/utils/test_order_items.js";

describe("OrderPanel.cy.js", () => {
    it("mounts", () => {
        cy.mount(<OrderPanel />);
        cy.get("[data-cy=order-panel]").should("exist");
    });

    it("mounts with items", () => {
        cy.mount(<OrderPanel testOrderItems={TEST_ITEMS} />);
        cy.get("[data-cy=order-panel]").should("exist");
        cy.get("[data-cy=order-list-item]").should("exist");
    });

    it("cart appears on add item", () => {
        cy.mount(<OrderPanel testOrderItems={TEST_ITEMS} />);
        cy.get("[data-cy=order-panel]").should("exist");
        cy.get("[data-cy=order-list-item]").should("exist");
        cy.get("[name=increment]").first().click();
        cy.get("[name=add").first().click();
        cy.get("[data-cy=cart-list-item]").should("exist");
    });

    it("cart contains multiple items", () => {
        cy.mount(<OrderPanel testOrderItems={TEST_ITEMS} />);
        cy.get("[data-cy=order-panel]").should("exist");
        cy.get("[data-cy=order-list-item]").should("exist");
        cy.get("[name=increment]").first().click();
        cy.get("[name=add").first().click();
        cy.get("[name=increment]").eq(1).click();
        cy.get("[name=add").eq(1).click();
        cy.get("[data-cy=cart-list-item]").should("have.length", 2);
    });

    it("cart disappears on delete item", () => {
        cy.mount(<OrderPanel testOrderItems={TEST_ITEMS} />);
        cy.get("[data-cy=order-panel]").should("exist");
        cy.get("[data-cy=order-list-item]").should("exist");
        cy.get("[name=increment]").first().click();
        cy.get("[name=add").first().click();
        cy.get("[data-cy=cart-list-item]").should("exist");
        cy.get("[data-cy=cart-list-item-delete]").first().click();
        cy.get("[data-cy=cart-list-item]").should("not.exist");
    });

    it("cart disappears on delete all", () => {
        cy.mount(<OrderPanel testOrderItems={TEST_ITEMS} />);
        cy.get("[data-cy=order-panel]").should("exist");
        cy.get("[data-cy=order-list-item]").should("exist");
        cy.get("[name=increment]").first().click();
        cy.get("[name=add").first().click();
        cy.get("[name=increment]").eq(1).click();
        cy.get("[name=add").eq(1).click();
        cy.get("[data-cy=cart-list-item]").should("exist");
        cy.get("[data-cy=cart-clear]").click();
        cy.get("[data-cy=cart-list-item]").should("not.exist");
    });
});
