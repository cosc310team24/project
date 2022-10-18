/*
 * Created on Wed Oct 12 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient.js";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import Auth from "/components/Auth.jsx";
import Account from "/components/Account.jsx";

export const Users = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
        let mounted = true;

        const getInitialSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (mounted) {
                if (session) {
                    setSession(session);
                }

                setIsLoading(false);
            }
        };

        getInitialSession();

        const { subscription } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session);
            }
        );

        return () => {
            mounted = false;
            subscription?.unsubscribe();
        };
    }, []);

    return (
        <Content title="Users">
            <TextColumn text="">
                {session ? (
                    <Account key={session.user.id} session={session} />
                ) : (
                    <Auth />
                )}
            </TextColumn>
        </Content>
    );
};

export default Users;
