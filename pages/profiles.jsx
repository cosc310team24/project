/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";
import Content from "/components/Content";
import ProfilesPanel from "/components/ProfilesPanel";
import User from "/public/libs/user.js";
import TEST_USERS from "/utils/test_user_profiles_2.js";
import { useRouter } from "next/router";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import TextColumn from "/components/TextColumn";

export const Profiles = () => {
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [permission, setPermission] = useState(0);
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            return;
        }

        // Only run query once user is logged in.
        if (user) {
            loadPermission();
            // loadData();
        } else {
            router.push("/login");
        }
    }, [user]);

    async function loadPermission() {
        try {
            setLoading(true);

            const { data } = await supabase
                .from("profiles")
                .select("permission")
                .eq("id", user.id)
                .single();

            if (data) {
                console.log(`Loaded permission: ${data.permission}`);
                setPermission(data.permission);
            }
        } catch (error) {
            alert(`Error in loadPermission: ${error.message}`);
        } finally {
            loadData();
        }
    }

    async function loadData() {
        try {
            setLoading(true);

            // loadPermission();

            // const { data } = await supabase
            //     .from("profiles")
            //     .select("permission")
            //     .eq("id", user.id)
            //     .single();

            // if (data) {
            //     console.log("Loaded user permission: ", data);
            //     setPermission(data.permission);
            // }

            const { profs } = await supabase.from("profiles").select("*");

            if (profs) {
                console.log("Loaded user profiles: ", profs);
                setProfiles(profs);
            }
        } catch (error) {
            alert(`Error in loadData: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Content title="Profiles">
            <TextColumn>
                {loading ? (
                    <h2>Loading...</h2>
                ) : (
                    <ProfilesPanel profiles={profiles} />
                )}
            </TextColumn>
        </Content>
    );
};

export default Profiles;
