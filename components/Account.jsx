/*
 * Created on Wed Oct 12 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useState, useEffect } from "react";
// import { supabase } from "../utils/supabaseClient.js";
import styles from "../styles/Account.module.css";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import withPageAuth from "@supabase/auth-helpers-nextjs";

export const Account = ({ session }) => {
    const supabase = useSupabaseClient();
    const user = useUser();

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [permission, setPermission] = useState(null);

    useEffect(() => {
        getProfile();
    }, [session]);

    const getProfile = async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("profiles")
                .select("firstName, lastName, email, permission")
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                console.error("Error fetching profile: ", error.message);
                throw error;
            } else if (status === 406) {
                console.log("No profile found");
            }

            // React hooks
            if (data) {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setPermission(data.permission);
            }
        } catch (error) {
            alert(`Error in  getProfile: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async ({
        firstName,
        lastName,
        email,
        permission,
    }) => {
        try {
            setLoading(true);

            const updates = {
                id: user.id,
                firstName,
                lastName,
                email: session.user.email,
                permission: permission ? permission : user.permission,
            };

            let { error } = await supabase
                .from("profiles")
                .upsert(updates)
                .lte("permission", permission);

            if (error) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const prepareName = (text, len) => {
        const name = text
            .replace(/[$&+,:;=?[\]@#|{}'<>.^*()%!_/]/, "")
            .substr(0, text.length < len ? text.length : len);
        return name[name.length - 1] === " " ? name.trim() + " " : name.trim();
    };

    return (
        <div className={styles.formWidget}>
            <h1>Profile</h1>
            <div>
                <label htmlFor="email">Email</label>
                <br />
                <input
                    id="email"
                    type="text"
                    className="inputField total-radius"
                    value={session.user.email}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="firstName">First Name</label>
                <br />
                <input
                    id="firstName"
                    type="text"
                    className="inputField total-radius"
                    value={firstName || ""}
                    onChange={(e) =>
                        setFirstName(prepareName(e.target.value, 32))
                    }
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <br />
                <input
                    id="lastName"
                    type="text"
                    className="inputField total-radius"
                    value={lastName || ""}
                    onChange={(e) =>
                        setLastName(prepareName(e.target.value, 32))
                    }
                />
            </div>
            <div>
                <label htmlFor="permission">Permission</label>
                <br />
                <input
                    id="permission"
                    type="number"
                    className="inputField total-radius"
                    value={parseInt(permission) || 0}
                    onChange={(e) => setPermission(e.target.value)}
                    disabled
                />
            </div>

            <div>
                <button
                    className="uibutton"
                    onClick={() =>
                        updateProfile({ firstName, lastName, email })
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
