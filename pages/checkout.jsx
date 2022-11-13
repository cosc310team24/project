/*
 * Created on Sun Nov 13 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "/utils/supabase.js";
import { useUser } from "/context/user.jsx";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import Incrementor from "/components/Incrementor.jsx";
import CheckoutTable from "/components/CheckoutTable.jsx";
import { TEST_ITEMS } from "/utils/test_order_items.js";

export const Checkout = () => {
    const router = useRouter();
    const [cartData, setCartData] = useState(router.query);

    return (
        <Content title="Checkout">
            <TextColumn>
                {/* <p>{JSON.stringify(cartData)}</p> */}
                <CheckoutTable items={cartData} />
            </TextColumn>
        </Content>
    );
};

export default Checkout;
