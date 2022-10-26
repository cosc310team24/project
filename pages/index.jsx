/**
 * COSC 310 Team 24 Hospital IMS Proof of Concept
 * By Connor Doman
 * 2022-10-05
 */

import Content from "/components/Content.jsx";
import TextColumn from "/components/TextColumn.jsx";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "/components/Account.jsx";

/**
 * Page content and app entry point
 */

export const App = () => {
    const session = useSession();
    const supabase = useSupabaseClient();

    return (
        <Content title="Home">
            <TextColumn>
                {!session ? (
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        theme="light"
                    />
                ) : (
                    <Account key={session.user.id} session={session} />
                )}
            </TextColumn>
        </Content>
    );
};

export default App;
