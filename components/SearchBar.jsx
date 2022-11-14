const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <input 
        type="text"
        placeholder="Search by shipment ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />

);
export default SearchBar;