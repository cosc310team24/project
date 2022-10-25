/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import { useEffect } from "react";
import { APP_NAME, APP_PREFIX } from "/utils/app_data.js";
import { isMobile } from "react-device-detect";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export const Content = ({ title, children }) => {
    useEffect(() => {
        document.title = `${title} | ${APP_NAME}`;
    });
    return (
        <div className="content">
            <Head>
                {/* <link rel="icon" href="/favicon.ico" /> */}
                <link
                    rel="icon"
                    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏥</text></svg>"
                />
            </Head>
            <Header title={APP_PREFIX + " " + title} />
            {children}
            <Footer />
        </div>
    );
};

export default Content;
