/*
 * Created on Sun Nov 13 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "/utils/supabase.js";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import Incrementor from "/components/Incrementor.jsx";
import CheckoutTable from "/components/CheckoutTable.jsx";
import { TEST_ITEMS } from "/utils/test_order_items.js";

export const Checkout = () => {
    const router = useRouter();
    console.log("query data: ", router.query.data);
    console.log(`URL data is ${router.query.data}`);
    const [cartData, setCartData] = useState({});

    useEffect(() => {
        setCartData(JSON.parse(router.query.data || "{}"));
    }, [router.query.data]);

    useEffect(() => {
        // console.log(cartData, JSON.parse(JSON.stringify(cartData, null, 4)));
    }, [cartData]);

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
