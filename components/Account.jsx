/*
 * Created on Wed Oct 12 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient.js";
import styles from "../styles/Account.module.css";

export const Account = ({ session }) => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [website, setWebsite] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        getProfile();
    }, [session]);

    const getCurrentUser = async () => {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (!session?.user) throw new Error("Not logged in");

        return session.user;
    };

    const getProfile = async () => {
        try {
            setLoading(true);
            const user = await getCurrentUser();

            let { data, error, status } = await supabase
                .from("profiles")
                .select("username, website, avatar_url")
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                console.error("Error fetching profile", error.message);
                throw error;
            } else if (status === 406) {
                console.log("No profile found");
            }

            // React hooks
            if (data) {
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async ({ username, website, avatar_url }) => {
        try {
            setLoading(true);
            const user = await getCurrentUser();

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            };

            let { error } = await supabase.from("profiles").upsert(updates);

            if (error) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const prepareUsername = (text, len) => {
        const name = text
            .replace(/[$&+,:;=?[\]@#|{}'<>.^*()%!-/\s]/, "")
            .substr(0, text.length < len ? text.length : len);
        setUsername(name);
    };

    return (
        <div className="formWidget">
            <h1>Profile</h1>
            <div>
                <img className={styles.avatar} src={avatar_url} alt="avatar" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    className="inputField"
                    value={session.user.email}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="username">Name</label>
                <input
                    id="username"
                    type="text"
                    className="inputField"
                    value={username || ""}
                    onChange={(e) => prepareUsername(e.target.value, 32)}
                />
            </div>
            <div>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="website"
                    className="inputField"
                    value={website || ""}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="uibutton"
                    onClick={() =>
                        updateProfile({ username, website, avatar_url })
                    }
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Update"}
                </button>
            </div>

            <div>
                <button
                    className="uibutton"
                    onClick={() => supabase.auth.signOut()}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Account;
