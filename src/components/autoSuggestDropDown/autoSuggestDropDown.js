import React from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/umd/match";
import AutosuggestHighlightParse from "autosuggest-highlight/umd/parse";

import "./scss/autoSuggestDropDown.scss";

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(filterArr, value) {
  const escapedValue = escapeRegexCharacters((value ?? value.trim()) || '');

  const regex = new RegExp("\\b" + escapedValue, "i");
  return filterArr.filter((person) => regex.test(getSuggestionValue(person)));
}

function getSuggestionValue(suggestion) {
  return `${suggestion.label}`;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.label}`;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);
  return (
    <span className={"suggestion-content "}>
      <span className="name">
        {parts.map((part, index) => {
          const className = part.highlight ? "highlight" : null;
          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    </span>
  );
}

class AutoSuggestDropDown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue,
      suggestions: [],
    };
   this.inputRef = React.createRef();

  }

  onChange = (event, { newValue, method }) => {
    if (this.props.onChangeHandler) {
      this.props.onChangeHandler(newValue);
    }
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(this.props.suggestionValue, value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  focusHandler = () =>{
    this.inputRef.current.input.focus();
  }
  
  renderInputComponent = inputProps => {
    return(
    <div className="inputContainer">
      <input {...inputProps} disabled={this.props.disabled} className={`${inputProps.className} ${inputProps?.required && 'input-error'} ${this.props.disabled && 'disabled-input'}`} style={this.props.style ?? {}}/>
      {!this.props.hideIcon ? <i className="icon input-search" onClick={this.focusHandler}></i> : ''}
    </div>);
  }
  shouldRenderSuggestions = () => {
    return true;
  };

  onClick = () => {
    this.setState({
      suggestions: getSuggestions(this.props.suggestionValue, ""),
    });
    return null;
  }
  
  render() {
    const { suggestions } = this.state;
    const inputProps = {
      placeholder: this.props.placeholderVal,
      value: this.props.defaultValue,
      onChange: this.onChange,
      onClick: this.onClick,
      required : this.props.required
    };
    return (
     
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue ?? ""}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={this.renderInputComponent}
        ref={this.inputRef }
        shouldRenderSuggestions={this.shouldRenderSuggestions}    
      />
    );
  }
}

export default AutoSuggestDropDown;
