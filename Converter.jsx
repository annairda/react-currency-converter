import React from "react";
import axios from "axios";

class Converter extends React.Component {
  state = {
    inputValue: "",
    currencies: [],
    selectedCurrency: "CHF",
    result: ""
  };
  componentDidMount() {
    const one = "https://api.nbp.pl/api/exchangerates/rates/A/CHF/";
    const two = "https://api.nbp.pl/api/exchangerates/rates/A/EUR/";
    const three = "https://api.nbp.pl/api/exchangerates/rates/A/USD/";

    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          let newArr = responses.map((i) => ({
            code: i.data.code,
            value: i.data.rates[0].mid
          }));
          this.setState({ currencies: newArr });
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  }
  changeInput = (event) => {
    this.setState({
      inputValue: event.target.value
    });
  };
  changeCurrency = (event) => {
    this.setState({
      selectedCurrency: event.target.value
    });
  };
  calculate = () => {
    const currency = this.state.currencies.find(
      (v) => v.code === this.state.selectedCurrency
    );
    this.setState({
      result: currency.value * this.state.inputValue
    });
  };
  render() {
    return (
      <div>
        <h1>Przelicznik walut</h1>
        <input value={this.state.inputValue} onChange={this.changeInput} />
        <select
          value={this.state.selectedCurrency}
          onChange={this.changeCurrency}
        >
          {this.state.currencies.map((c) => (
            <option value={c.code}>{c.code}</option>
          ))}
        </select>
        <button onClick={this.calculate}>Przelicz</button>
        <p>{this.state.result} zł</p>
      </div>
    );
  }
}
export default Converter;
