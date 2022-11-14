/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { supabase } from "/utils/supabase.js";
import { useRouter } from "next/router";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import Button from "/components/Button.jsx";
import { useUser } from "../context/user-context";

export const UserPage = () => {
    const [profile, setProfile] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchProfile();
    });

    const fetchProfile = async () => {
        const profileData = await supabase.auth.getUser();
        if (profileData) {
            setProfile(profileData);
        } else {
            router.push("/login");
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <Content title="User">
            <TextColumn>
                {!profile ? (
                    <h1>Not Logged In</h1>
                ) : (
                    <div>
                        <h1>{profile.email}</h1>
                        <h2>ID: {profile.id}</h2>
                        <Button onClick={signOut}>Sign Out</Button>
                    </div>
                )}
            </TextColumn>
        </Content>
    );
};

export default UserPage;
