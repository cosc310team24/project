const app = document.getElementById("app");

const LINKS = ["Order", "Shipments", "Warehouse"];

const headerStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "sans-serif",
};

function NavLinks({ links }) {
    const linkList = links.map((link) => {
        return <li key={link}>{link}</li>;
    });
    return <ul className="navLinks">{linkList}</ul>;
}

function Header({ title }) {
    return (
        <header style={headerStyle}>
            <h1>{title}</h1>
            <NavLinks links={LINKS} />
        </header>
    );
}

function App() {
    return <Header title="Hospital IMS" />;
}

ReactDOM.render(<App />, app);
