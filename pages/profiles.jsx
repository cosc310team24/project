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
import { useUser } from "@supabase/auth-helpers-react";

export const Profiles = () => {
    const user = useUser();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            return;
        }

        if (!user) {
            router.push("/login");
        }
    }, [user]);

    if (!user) {
        return <div>Redirecting...</div>;
    }

    return (
        <Content title="Profiles">
            <ProfilesPanel profiles={TEST_USERS} />
        </Content>
    );
};

export default Profiles;
