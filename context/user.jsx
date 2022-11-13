/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "/utils/supabase.js";
import { useRouter } from "next/router";
import axios from "axios";

const CONTEXT = createContext();

const Provider = ({ children }) => {
    const router = useRouter();
    const [user, setSessionUser] = useState(supabase.auth.getUser());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserProfile = async () => {
            // const {
            //     data: { user },
            // } =
            await supabase.auth.getUser().then(
                async (u) => {
                    if (u) {
                        console.warn({ u });
                        const { data: profile } = await supabase
                            .from("profiles")
                            .select("*")
                            .eq("id", u.id)
                            .single();

                        setSessionUser({ ...u, ...profile });

                        setIsLoading(false);
                    }
                },
                () => {}
            );
        };

        getUserProfile();

        supabase.auth.onAuthStateChange(() => {
            getUserProfile();
        });
    }, []);

    // useEffect(() => {
    //     try {
    //         axios.post("/api/set-supabase-cookie", {
    //             event: user ? "SIGNED_IN" : "SIGNED_OUT",
    //             session: supabase.auth.getSession(),
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [user]);

    const login = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "github",
        });
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
    };

    const exposed = { user, login, logout, isLoading };

    return <CONTEXT.Provider value={exposed}>{children}</CONTEXT.Provider>;
};

export const useUser = () => useContext(CONTEXT);

export default Provider;
