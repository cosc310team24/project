import TextBox from "/components/TextBox";

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <TextBox
        placeholder="Search by shipment ID"
        value={searchQuery}
        onChange={(v) => setSearchQuery(v)}
    />
);
export default SearchBar;
