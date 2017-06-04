import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: props.source,
            loading: props.source && props.source.then
        };
    }

    componentDidMount() {
        this.maybeFetchSource(this.props.source);
    }

    componentWillReceiveProps(props) {
        this.maybeFetchSource(props.source);
    }

    maybeFetchSource(source) {
        if (source && source.then) {
            this.setState({ loading: true });
            source
                .then(items => this.setState({
                    source: items,
                    loading: false
                }))
                .catch(() => this.setState({ loading: false }));
        }
    }

    onChange = (event) => {
        const value = event.target.value;
        this.props.onChange(value);
    }

    render() {
        if (this.state.loading)
            return <div>Loading...</div>;

        const { source } = this.state;
        const { label, value } = this.props;

        const listItems = source && source.map((item) =>
            <option key={item.id} value={item.id}>{item.name}</option>
        );

        return (
            <select placeholder={label}
                onChange={this.onChange}
                value={value || ''}>
                <option value=''>{label}</option>
                {listItems}
            </select>
        );
    }
}

export default Dropdown;