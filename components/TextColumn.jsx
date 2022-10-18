/*
 * Created on Sun Oct 09 2022
 * Copyright (c) 2022 Connor Doman
 */

export const TextColumn = ({ text, children }) => {
    return (
        <div className="textColumn">
            <p>{text}</p>
            {children || ""}
        </div>
    );
};

export default TextColumn;
