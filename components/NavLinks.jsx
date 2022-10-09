/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import Link from "next/link";

export const NavLink = ({ link }) => {
    return (
        <li className="navLink">
            <Link href={"/" + link.toLowerCase()}>
                <a className="link-unstyled">{link}</a>
            </Link>
        </li>
    );
};

export const NavLinks = ({ links }) => {
    const linkList = links?.map((link) => {
        return <NavLink key={link} link={link} />;
    });
    return <ul className="navLinks">{linkList}</ul>;
};

export default NavLinks;
