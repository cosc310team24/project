import Incrementor from "/components/Incrementor.jsx";

describe("Incrementor.cy.js", () => {
    const counterSelector = '[data-cy="counter"]';
    const incrementSelector = '[name="increment"]';
    const decrementSelector = '[name="decrement"]';

    it("mounts", () => {
        cy.mount(<Incrementor />);
    });

    it("should increment", () => {
        let value = 0;
        cy.mount(<Incrementor />);
        cy.get(counterSelector).should("have.value", "0");
        cy.get(incrementSelector).click();
        cy.get(counterSelector).should("have.value", "1");
    });

    it("should disable increment", () => {
        cy.mount(<Incrementor value={5} max="5" />);
        cy.get(incrementSelector).should("be.disabled");
    });

    it("should disable decrement", () => {
        cy.mount(<Incrementor value={0} min="0" />);
        cy.get(decrementSelector).should("be.disabled");
    });

    it("should disable/enable appropriately", () => {
        let max = 5;
        let min = 0;
        cy.mount(<Incrementor value={0} min={min} max={max} />);
        cy.get(incrementSelector).should("not.be.disabled");
        cy.get(decrementSelector).should("be.disabled");
        for (let i = 0; i < max; i++) {
            cy.get(incrementSelector).click();
        }
        cy.get(incrementSelector).should("be.disabled");
        cy.get(decrementSelector).should("not.be.disabled");
    });
});
