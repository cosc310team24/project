/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect, Children, cloneElement } from "react";
import Content from "/components/Content";
import TextColumn from "/components/TextColumn";
import { supabase } from "../utils/supabaseClient.js";

export const Authenticator = ({ stator, children }) => {
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

    const handleStator = () => {
        stator(session);
    };

    return (
        <div>
            {session ? (
                () => {
                    handleStator();
                    return children;
                }
            ) : (
                <TextColumn text="You must be signed in to view this content." />
            )}
        </div>
    );
};

export default Authenticator;
