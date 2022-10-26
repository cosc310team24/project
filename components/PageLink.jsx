/*
 * Created on Wed Oct 26 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useRouter } from "next/router";

export const PageLink = ({ href, children }) => {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <a className="pageLink" href={href} onClick={handleClick}>
            {children}
        </a>
    );
};

export default PageLink;
