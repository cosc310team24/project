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
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const User = () => {
    const user = useUser();
    const router = useRouter();
    const supabase = useSupabaseClient();
    const [userData, setUserData] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [permission, setPermission] = useState("");

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            return;
        }

        if (!user) {
            router.push("/login");
        }

        async function loadData() {
            try {
                setLoading(true);

                const { data } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                setUserData(data);
                console.log("Loaded user data: ", data);

                if (data) {
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setEmail(data.email);
                    setPermission(data.permission);
                }
            } catch (error) {
                alert(`Error in loadData: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        // Only run query once user is logged in.
        if (user) loadData();
    }, [user]);

    if (!user) {
        return <div>Redirecting...</div>;
    }

    return (
        <Content title={user.email}>
            <TextColumn>
                {loading ? (
                    <h1>Loading profile...</h1>
                ) : (
                    <h1>{`Hello, ${firstName || ""} ${lastName || ""}`}</h1>
                )}
            </TextColumn>
        </Content>
    );
};

export default User;
