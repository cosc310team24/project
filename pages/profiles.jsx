/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";
import { supabase } from "/utils/supabase.js";
import Content from "/components/Content";
import TextColumn from "/components/TextColumn";
import ProfilesPanel from "/components/ProfilesPanel";

export const Profiles = ({ profiles }) => {
    const [mounted, setMounted] = useState(false);
    const [permission, setPermission] = useState(0);
    // const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading && profiles) {
            setLoading(false);
            console.log(profiles);
        }
    }, [profiles]);

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

export const getStaticProps = async () => {
    const { data: profiles } = await supabase.from("profiles").select("*");

    return {
        props: {
            profiles,
        },
    };
};

export default Profiles;
