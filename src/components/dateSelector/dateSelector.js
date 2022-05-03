import React from "react";
import {
  Input,
} from 'reactstrap';
import "./dateSelector.scss";

export const formConstants = {
  EMPTY_DATE: 'Please select date'
};

class DateSelector extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {     
      isFormSubmitted: false,
      form:  this.props.defaultValue,        
      error: {          
        date: false,        
      },
      keyPressedEvent: {
        validKey: true,
        backspace: false
      }        
    };
   this.inputRef = React.createRef();

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDateChangeKeyPress = this.handleDateChangeKeyPress.bind(this);

  }

  handleDateChange = e => {
    if (this.state.keyPressedEvent.validKey) {
      let { form, error } = this.state;
      form = e.target.value;
      if (!this.state.keyPressedEvent.backspace) {
        if (form.length === 2 || form.length === 5) {
          form = form + '/';
        }
      }
      this.props.onChangeHandler(form);
      this.setState({
        form: form,
        error: error
      });
    }
  };

handleDateChangeKeyPress = e => {
    const validkeys = [
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57,
      48,
      96,
      97,
      98,
      99,
      100,
      101,
      102,
      103,
      104,
      105,
      8,
      46,
      13
    ];
    if (validkeys.indexOf(e.which) < 0) {
      this.setState({
        keyPressedEvent: {
          backspace: false,
          validKey: false
        }
      });
    } else {
      if (e.which === 8 || e.which === 46) {
        this.setState({
          keyPressedEvent: {
            backspace: true,
            validKey: true
          }
        });
      } else if (e.which === 13) {
        // this.searchMember(e);
      } else {
        this.setState({
          keyPressedEvent: {
            backspace: false,
            validKey: true
          }
        });
      }
    }
  };

  render() {  
    return (
      <div className="datePickerDiv">
     <Input
        type="text"
        name={this.props.name}
        id={this.props.id}
        placeholder="MM/DD/YYYY"
        autoComplete="off"
        maxLength="10"
        style={{width:'100%'}}  
        value={this.props.defaultValue}    
        onChange={this.handleDateChange}
        onKeyDown={this.handleDateChangeKeyPress}     
        disabled={this.props.disabled ?? false}    
        className={this.props?.className} 
        invalid={this.props.invalid || false}  
      />
      {this.state.error.date && this.state.isFormSubmitted && (
        <span className="text-danger dobErrorMsg">
          {' '}
          {formConstants.EMPTY_DATE}{' '}
        </span>
      )}  
      </div>   
    );
  }
}

export default DateSelector;
