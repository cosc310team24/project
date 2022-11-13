/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect } from "react";
import { supabase } from "/utils/supabase.js";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import { useUser } from "../context/user";

const Login = () => {
    const { login } = useUser();

    useEffect(() => {
        login();
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
