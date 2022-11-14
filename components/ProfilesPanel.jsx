/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import User from "/public/libs/user.js";
import TextColumn from "/components/TextColumn";
import styles from "/styles/ProfilesPanel.module.css";
import TextBox from "/components/TextBox";

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
                initialValue={val}
                onChange={handleChange}
                max={5}
                min={0}
                style={{ margin: 0 }}
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
            <TextBox
                type="text"
                value={currentValue}
                onChange={(v) => {
                    setCurrentValue(v);
                }}
            />
        </td>
    );
};

export const ProfileTableRow = ({ profile }) => {
    const [uid, setUid] = useState(profile.id);
    const [fname, setFirstName] = useState(profile.firstNname);
    const [lname, setLastName] = useState(profile.lastName);
    const [email, setEmail] = useState(profile.email);
    const [permission, setPermission] = useState(profile.permission);

    return (
        <tr className={styles.profileRow}>
            <td className={styles.idCell} title={uid}>
                <Link href={"/" + uid}>{uid.slice(0, 5)}</Link>
            </td>
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
                prof.id,
                prof.firstName,
                prof.lastName,
                prof.email,
                prof.permission
            );
        }
        return <ProfileTableRow key={u.id} profile={u} />;
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
