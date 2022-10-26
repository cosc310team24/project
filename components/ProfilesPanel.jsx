/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect, useRef } from "react";
import styles from "/styles/ProfilesPanel.module.css";
import User from "/public/libs/user.js";
import Authenticator from "/components/Authenticator";

export const ProfileInputCell = ({ val, onChange }) => {
    const [currentValue, setCurrentValue] = useState(val);

    return (
        <td>
            <input
                className={styles.input + " total-radius"}
                type="text"
                value={currentValue}
            />
        </td>
    );
};

export const ProfileTableRow = ({ user }) => {
    return (
        <tr className={styles.profileRow}>
            <td className={styles.idCell}>{user.id}</td>
            <ProfileInputCell val={user.firstName} />
            <ProfileInputCell val={user.lastName} />
            <ProfileInputCell val={user.email} />
            <ProfileInputCell val={user.permission} />
        </tr>
    );
};

export const ProfileTable = ({ userList }) => {
    const profs = userList.map((user) => {
        let u = user;
        if (!(user instanceof User)) {
            u = new User(
                user.uniqueID,
                user.firstName,
                user.lastName,
                user.email,
                user.permission
            );
        }
        return <ProfileTableRow key={user.uniqueID} user={u} />;
    });

    return (
        <table className={styles.profileTable}>
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

export const ProfilePanel = ({ users }) => {
    const [session, setSession] = useState(null);

    const passSession = (s) => {
        setSession(s);
    };

    return (
        <div>
            <Authenticator stator={passSession}>
                <ProfileTable userList={users} session={session} />
            </Authenticator>
        </div>
    );
};

export default ProfilePanel;
