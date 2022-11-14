/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useEffect, useState } from "react";
import { supabase } from "/utils/supabase.js";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import { useUser } from "../context/user-context";
import TextBox from "/components/TextBox.jsx";
import { Button } from "/components/Button.jsx";

export const Login = () => {
    const { login } = useUser();
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const signIn = async () => {
        if (!email) return;

        const { error, data } = await supabase.auth.signIn({
            provider: "github",
        });

        if (error) {
            console.error({ error });
        } else {
            setSubmitted(true);
        }
    };

    return (
        <Content title="Login">
            <TextColumn>
                {submitted ? (
                    <p>Check your email for the link!</p>
                ) : (
                    <div>
                        <TextBox
                            placeHolder="Email"
                            onChange={(v) => {
                                setEmail(v);
                            }}
                        />
                        <Button onClick={signIn}>Sign In</Button>
                    </div>
                )}
            </TextColumn>
        </Content>
    );
};

export default Login;
