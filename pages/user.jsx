/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { supabase } from "/utils/supabase.js";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import { useUser } from "../context/user";

export const UserPage = () => {
    const { user, isLoading } = useUser();
    console.log("User data", user["data"]);

    return (
        <Content title="User">
            <TextColumn>
                {!isLoading && (
                    <p className="mb-6">
                        {user
                            ? `Subscribed: ${user.data.id}`
                            : "Not subscribed"}
                    </p>
                )}
            </TextColumn>
        </Content>
    );
};

export const getStaticProps = async () => {
    const { user, isLoading } = await useUser();

    return {
        props: {
            user,
            isLoading,
        },
    };
};

export default UserPage;
