import React, { PureComponent } from "react";
import { AsyncSelect } from "@atlaskit/select";

export default class Select extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
       inputValue: "",
       options : this.props.options || []
      };
  }

  componentDidUpdate(prevProps){

    if(this.props.options !== prevProps.options){
      this.setState({...this.state , options : this.props.options})
    }
  }

  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    // eslint-disable-next-line react/no-unused-state
    this.setState({...this.state, inputValue });
    return inputValue;
  };

  filterOptions = (inputValue) =>
    this.state.options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.state.options);
      }, 1000);
    });

  render() {
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        {
          ...this.props
        }
        loadOptions={this.promiseOptions}
      />
    );
  }
}
