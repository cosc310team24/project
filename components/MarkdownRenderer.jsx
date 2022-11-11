/*
 * Created on Thu Nov 10 2022
 * Copyright (c) 2022 Connor Doman
 */
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import styles from "/styles/MarkdownRenderer.module.css";

export const MarkdownRenderer = ({ file }) => {
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        fetch(file)
            .then((response) => response.text())
            .then((text) => {
                setMarkdown(text);
            });
    }, []);

    return (
        <div className={styles.markdownArea}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
