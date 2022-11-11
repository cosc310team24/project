/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

import Link from "next/link";
import NavLinks from "./NavLinks";
import { FaRegHospital } from "react-icons/fa";

export const LINK_LIST = ["Order", "Shipments", "Warehouse", "Users"];

export const Header = ({ title }) => {
    return (
        <header className="navHeader">
            <Link href="/">
                <a
                    className="link-unstyled"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <FaRegHospital
                        style={{ fontSize: "36pt", margin: "0 0.5em 0 0" }}
                    />
                    <h1>{title}</h1>
                </a>
            </Link>
            <NavLinks links={LINK_LIST} />
        </header>
    );
};

export default Header;
