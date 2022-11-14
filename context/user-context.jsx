/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "/utils/supabase.js";
import { useRouter } from "next/router";

const CONTEXT = createContext();

const Provider = ({ children }) => {
    const router = useRouter();
    const [authenticatedState, setAuthenticatedState] =
        useState("unauthenticated");
    // const [user, setSessionUser] = useState(supabase.auth.getUser());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // const getUserProfile = async () => {
        // const {
        //     data: { user },
        // } =
        //     await supabase.auth.getUser().then(
        //         async (u) => {
        //             if (u) {
        //                 // console.warn({ u });
        //                 const { data: profile } = await supabase
        //                     .from("profiles")
        //                     .select("*")
        //                     .eq("id", u.id)
        //                     .single();

        //                 setSessionUser({ ...u, ...profile });

        //                 setIsLoading(false);
        //             }
        //         },
        //         () => {}
        //     );
        // };

        // getUserProfile();

        // supabase.auth.onAuthStateChange(() => {
        //     getUserProfile();
        // });

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                handleAuthChange(event, session);
                if (event === "SIGNED_IN") {
                    setAuthenticatedState("authenticated");
                    router.push("/user");
                }
                if (event === "SIGNED_OUT") {
                    setAuthenticatedState("unauthenticated");
                }
            }
        );
        checkUser();
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const handleAuthChange = async (event, session) => {
        await fetch("/api/auth", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session }),
        });
    };

    const checkUser = async () => {
        const user = await supabase.auth.getUser();
        if (user) {
            setAuthenticatedState("authenticated");
        }
    };

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

    const exposed = { login, logout, isLoading };

    return <CONTEXT.Provider value={exposed}>{children}</CONTEXT.Provider>;
};

export const useUser = () => useContext(CONTEXT);

export default Provider;
