/*
 * Created on Fri Nov 11 2022
 * Copyright (c) 2022 Connor Doman
 */
import { supabase } from "/utils/supabase.js";
import Content from "/components/Content";
import TextColumn from "/components/TextColumn";

export const UserDetails = ({ profile }) => {
    console.log({ profile });
    return (
        <Content title="User Details">
            <TextColumn>
                <h1>
                    {profile.firstName} {profile.lastName}
                </h1>
                <h2>{profile.email}</h2>
            </TextColumn>
        </Content>
    );
};

export const getStaticPaths = async () => {
    const { data: prof } = await supabase.from("profiles").select("id");

    const paths = prof.map(({ id }) => ({
        params: {
            id: id.toString(),
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params: { id } }) => {
    const { data: prof } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

    return {
        props: {
            profile: prof,
        },
    };
};

export default UserDetails;
