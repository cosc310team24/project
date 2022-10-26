/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 */

import Content from "/components/Content";
import ProfilesPanel from "/components/ProfilesPanel";
import User from "/public/libs/user.js";
import TEST_USERS from "/utils/test_user_profiles.js";

export const Profiles = () => {
    return (
        <Content title="Profiles">
            <ProfilesPanel users={TEST_USERS} />
        </Content>
    );
};

export default Profiles;
