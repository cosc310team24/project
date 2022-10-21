/*
 * Created on Wed Oct 20 2022
 * Copyright (c) 2022 Antonio Vazquez-Mackay
 */

import { useState } from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form action="/" method="get" style={{ textIndent: 40 }}>
        <label htmlFor="header-search">
        </label>
        <input
            // value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Filter by shipment ID"
            name="s"
        />
    </form>
);
export default SearchBar;