import CartBanner from "/components/Cart";

const testCart = {
    1: [{ id: 1, name: "Item 2", price: 15.99 }, 1],
    2: [{ id: 2, name: "Item 3", price: 61.99 }, 1],
    13: [{ id: 13, name: "Item 14", price: 71.99 }, 4],
    16: [{ id: 16, name: "Item 17", price: 45.99 }, 12],
    22: [{ id: 22, name: "Item 23", price: 40.99 }, 3],
};

describe("CartBanner.cy.js", () => {
    it("mounts", () => {
        cy.mount(<CartBanner />);
        cy.get("[data-cy=cart-clear]").should("exist");
    });

    it("shows items", () => {
        cy.mount(<CartBanner cart={testCart} />);
        cy.get("[data-cy=cart-list-item]").should("have.length", 5);
    });

    it("counts items properly", () => {
        cy.mount(<CartBanner cart={testCart} />);
        cy.get("[data-cy=cart-size]").should("have.text", "(21)");
    });

    it("deletes a single item", () => {
        let cart = { ...testCart };

        const onDelete = (item, quantity) => {
            let oldLen = Object.keys(cart).length;
            // Copy state object
            let newCartItems = { ...cart };
            newCartItems[item.id] = [item, quantity];

            // Remove item if quantity is 0
            if (quantity === 0) {
                delete cart[item.id];
                console.log(`Successfully removed item with id: ${item.id}`);
            }

            // Set to new updated value
            cart = newCartItems;

            // console.log(orderItems);
        };
        cy.mount(<CartBanner cart={cart} onItemDelete={onDelete} />);
        cy.get("[data-cy=cart-size]").should("have.text", "(21)");
        cy.get("[data-cy=cart-list-item]")
            .first()
            .find("[data-cy=cart-list-item-delete]")
            .click();
        cy.get("[data-cy=cart-list-item]").should("have.length", 4);
        cy.get("[data-cy=cart-size]").should("have.text", "(20)");
    });
});
