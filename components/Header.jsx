/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import Link from "next/link";
import NavLinks from "./NavLinks";

export const LINK_LIST = ["Order", "Shipments", "Warehouse", "Profiles"];

export const Header = ({ title }) => {
    return (
        <header className="navHeader">
            <Link href="/">
                <a className="link-unstyled">
                    <h1>{title}</h1>
                </a>
            </Link>
            <NavLinks links={LINK_LIST} />
        </header>
    );
};

export default Header;
