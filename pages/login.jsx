/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect } from "react";
import { supabase } from "/utils/supabase.js";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";

export const Login = () => {
    useEffect(() => {
        supabase.auth.signInWithOAuth({
            provider: "github",
        });
    }, []);
    return (
        <Content title="Login">
            <TextColumn>
                <h1>Logging in...</h1>
            </TextColumn>
        </Content>
    );
};

export default Login;