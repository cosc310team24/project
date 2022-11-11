/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect } from "react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";

export const OTPLogin = ({ loginFunction, loading }) => {
    const [email, setEmail] = useState("");

    return (
        <div>
            <h2>Sign in with a one-time password</h2>
            <p>A link will be sent to the email you enter.</p>
            <div>
                <input
                    type="email"
                    className="inputField total-radius"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <button
                    className="uibutton"
                    onClick={(e) => {
                        e.preventDefault();
                        loginFunction(email);
                    }}
                    disabled={loading}
                >
                    <span>{loading ? "Loading..." : "Send magic link"}</span>
                </button>
            </div>
        </div>
    );
};

export const Login = () => {
    const supabase = useSupabaseClient();
    const [loading, setLoading] = useState(false);

    const signInWithEmail = async (email) => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signInWithOtp({
                email,
            });

            if (error) {
                throw error;
            }

            alert("Check your email for the login link.");
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Content title="Login">
            <TextColumn>
                <OTPLogin loginFunction={signInWithEmail} loading={loading} />
            </TextColumn>
        </Content>
    );
};

export default Login;
