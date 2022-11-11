/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import PageLink from "/components/PageLink";

export const linkify = (str) => {
    let result = str.trim().replace(" ", "-").toLowerCase();
    return result.slice(0, str.length > 30 ? 30 : str.length);
};

export const NavLink = ({ link }) => {
    return (
        <li className="navLink">
            <Link href={"/" + linkify(link)}>
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
