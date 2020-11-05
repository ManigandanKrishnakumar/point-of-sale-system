import React, {useEffect, useState} from 'react';
import './ProductsSearchBar.scss';
import Autosuggest from 'react-autosuggest';
import {SuggestionItem} from '..';
import {getSearchResult} from '../../services/billService';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, onSuccess) => {
  getSearchResult(value, onSuccess);
};

export default ({onSelect, itemName, itemId}) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setValue(itemName);
  }, [itemName]);

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => {
    return (
      <SuggestionItem
        id={suggestion.ITEM_ID}
        name={suggestion.ITEM_NAME}
        quantity={suggestion.QUANTITY}
        price={suggestion.PRICE}
        selectedId={itemId}
      />
    );
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({value}) => {
    getSuggestions(value, setSuggestions);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, {newValue}) => {
    setValue(newValue);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Enter product name or id',
    value,
    onChange,
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => {
    onSelect((prevState) => {
      return {
        ...prevState,
        id: suggestion.ITEM_ID,
        name: suggestion.ITEM_NAME,
        remaningQty: suggestion.QUANTITY,
        unitPrice: suggestion.PRICE,
        billUnitPrice: suggestion.PRICE,
      };
    });
    return suggestion.ITEM_NAME;
  };

  return (
    <div className="search-bar-container">
      <h2 className="search-label">Product</h2>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};
