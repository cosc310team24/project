import React from 'react';


export class SearchTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }
    handleChange(event) {
        let searchValue = event.target.value;

        this.setState({ search: searchValue });
    }
    render() {
        let items = this.props.data,
            searchString = this.state.search.trim().toLowerCase();

        if (searchString.length > 0) {
            items = items.filter((i) => i.name.toLowerCase().match(searchString));
        }
        return (
            <div>
                <UserInput update={(i) => this.handleChange(i)} />
                <Table data={items} />
            </div>
        )
    }
}

export class UserInput extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (<div>
            <input className="form-control mb-2" placeholder="Search Inventory..." onChange={(i) => this.props.update(i)} />
        </div>)
    }
}

export class TableRow extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
                <td>{this.props.quantity}</td>
            </tr>)
    }
};

export class Table extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                        {this.props.data.map(function (d, i) {
                            return <TableRow key={'person-' + i}
                                name={d.name}
                                price={d.price}
                                quantity={d.quantity}
                            />
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SearchTable;