/*
 * Created on Wed Oct 12 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient.js";
import styles from "../styles/Auth.module.css";

export const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleLogin = async (email) => {
        try {
            setLoading(true);

            // Send magic link email to user
            const { error } = await supabase.auth.signInWithOtp({ email });

            if (error) throw error;

            alert("Check your email for the login link!");
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.auth}>
            <h1>Sign In</h1>
            <p className={styles.description}>
                A link will be sent to the email you enter below.
            </p>
            <div className={styles.formWidget}>
                <input
                    className="inputField total-radius"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleLogin(email);
                    }}
                    className="uibutton"
                    disabled={loading}
                >
                    <span>{loading ? "Loading" : "Send magic link"}</span>
                </button>
            </div>
        </div>
    );
};

export default Auth;
