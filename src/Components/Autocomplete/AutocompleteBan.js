import React, { useContext } from 'react';
import AutocompleteResult from "./AutoCompleteResult";
import 'isomorphic-fetch';

class AutocompleteBan extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query: '', results: [] };
        this.handleChange = this.handleChange.bind(this)
        this.getResults = this.getResults.bind(this)
        this.selectResult = this.selectResult.bind(this)
    }

    getResults() {
        const query = this.state.query
        console.log(query);
        const maxResults = this.props.maxResults || 7
        const minCharacters = this.props.minCharacters || 4
        if (query.length < minCharacters) return;
        const banRequest = new Request('https://api-adresse.data.gouv.fr/search/?q=' + query + '&limit=' + maxResults);
        fetch(banRequest)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(this.state.query)
                this.setState({ results: json.features, query: this.state.query });
            });
    }

    handleChange(event) {
        this.setState({ query: event.target.value });
    }

    selectResult(id) {
        const getById = (item) => { return item.properties.id === id }
        const currentResult = this.state.results.filter(getById)[0]
        const currentAddressTemplated = this.templateQuery(currentResult)
        this.setState({ results: [], query: currentAddressTemplated })
        this.props.onChange(currentResult);
        return currentAddressTemplated
    }

    templateQuery(address) {
        console.log("adress=" + address.properties.name + "zipcode" + address.properties.postcode + "city" + address.properties.city + "départment" + address.properties.context.split(',')[1]);
        console.log(" latitude: " + address.geometry.coordinates[1] + " longitude: " + address.geometry.coordinates[0])
        document.getElementById("inputAdresse").value = address.properties.name
        return address.properties.name + ' ' + address.properties.postcode + address.properties.city + address.properties.context.split(',')[1] + address.geometry.coordinates[0] + address.geometry.coordinates[1]
    }

    render() {
        return (<div>
            <input placeholder="45 rue du test..." type="text" id="inputAdresse"
                defaultValue={this.props.value || this.state.query}
                onChange={this.handleChange}
                onKeyUp={this.getResults} />
            <AutocompleteResult value={this.selectResult} results={this.state.results} selectResult={this.selectResult} />
        </div>);
    }

}

export default AutocompleteBan;