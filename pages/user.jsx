/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect } from "react";
import { supabase } from "/utils/supabase.js";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";

export const UserPage = ({ user }) => {
    console.log({ user });
    return (
        <Content title="User">
            <TextColumn>
                <h1>{user.email}</h1>
            </TextColumn>
        </Content>
    );
};

export const getStaticProps = async () => {
    const { data: user } = await supabase.auth.getUser();

    return {
        props: {
            user,
        },
    };
};

export default UserPage;
