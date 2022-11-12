/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect, useRef } from "react";
import styles from "/styles/ProfilesPanel.module.css";
import User from "/public/libs/user.js";
import TextColumn from "/components/TextColumn";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import Incrementor from "/components/Incrementor.jsx";

export const ProfileCellIncrementor = ({ val, onChange, disabled }) => {
    const [value, setValue] = useState(val);

    useEffect(() => {
        onChange(value);
    }, [value]);

    const handleChange = (value) => {
        setValue(value);
        onChange(value);
    };

    const increment = () => {
        setValue(value + 1);
    };

    const decrement = () => {
        setValue(value - 1);
    };

    return (
        <td className={styles.incrCell}>
            <Incrementor
                value={value}
                onChange={handleChange}
                onIncrement={increment}
                onDecrement={decrement}
                max="5"
                disabled={disabled}
            />
        </td>
    );
};

export const ProfileInputCell = ({ val, onChange }) => {
    const [currentValue, setCurrentValue] = useState(val);

    useEffect(() => {
        onChange(currentValue);
    }, [currentValue]);

    return (
        <td>
            <input
                className={styles.input + " total-radius"}
                type="text"
                value={currentValue}
                onChange={(e) => {
                    setCurrentValue(e.target.value);
                }}
            />
        </td>
    );
};

export const ProfileTableRow = ({ profile }) => {
    const [uid, setUid] = useState(profile.uuid);
    const [fname, setFirstName] = useState(profile.firstNname);
    const [lname, setLastName] = useState(profile.lastName);
    const [email, setEmail] = useState(profile.email);
    const [permission, setPermission] = useState(profile.permission);

    return (
        <tr className={styles.profileRow}>
            <td className={styles.idCell}>{uid}</td>
            <ProfileInputCell
                val={profile.firstName}
                onChange={(v) => setFirstName(v)}
            />
            <ProfileInputCell
                val={profile.lastName}
                onChange={(v) => setLastName(v)}
            />
            <ProfileInputCell
                val={profile.email}
                onChange={(v) => setEmail(v)}
            />
            <ProfileCellIncrementor
                val={profile.permission}
                onChange={(v) => setPermission(v)}
                disabled={false}
            />
        </tr>
    );
};

export const ProfileTable = ({ profiles }) => {
    const profs = profiles.map((prof) => {
        let u = prof;
        if (!(prof instanceof User)) {
            u = new User(
                prof.uniqueID,
                prof.firstName,
                prof.lastName,
                prof.email,
                prof.permission
            );
        }
        return <ProfileTableRow key={u.uniqueID} profile={u} />;
    });

    return (
        <table className={styles.profileTable + " total-radius"}>
            <thead>
                <tr className={styles.headerRow}>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Permission</th>
                </tr>
            </thead>
            <tbody>{profs}</tbody>
        </table>
    );
};

export const ProfilePanel = ({ profiles }) => {
    return (
        <TextColumn>
            <ProfileTable profiles={profiles} />
        </TextColumn>
    );
};

export default ProfilePanel;
