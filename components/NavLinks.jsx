/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import PageLink from "/components/PageLink";

export const NavLink = ({ link }) => {
    return (
        <li>
            <PageLink href={"/" + link.toLowerCase()}>{link}</PageLink>
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
