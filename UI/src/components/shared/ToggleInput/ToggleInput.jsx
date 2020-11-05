import React, {useContext, useEffect, useState} from 'react';
import './ToggleInput.scss';

import {BiEditAlt} from 'react-icons/bi';
import {GoCheck} from 'react-icons/go';
import {BillContext} from '../../../state/contexts/BillContext';

export default ({type, label, action, value, payloadId}) => {
  const inputRef = React.createRef();
  const {dispatch} = useContext(BillContext);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [inputRef, isEdit]);

  const onEdit = () => {
    console.log('hello');

    setIsEdit(true);
  };

  const onSave = () => {
    const payload = payloadId ? {value: inputValue, id: payloadId} : inputValue;
    dispatch({type: action, payload});
    setIsEdit(false);
  };

  return (
    <div className="toggle-input-container">
      {label ? <p className="label">{label + ' :'}</p> : null}

      <div className="input-container">
        <input
          type={type}
          className="toggle-input"
          disabled={!isEdit}
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onBlur={onSave}
        />
        {isEdit ? (
          <GoCheck className="input-icon tick" />
        ) : (
          <BiEditAlt className="input-icon" onClick={onEdit} />
        )}
      </div>
    </div>
  );
};
