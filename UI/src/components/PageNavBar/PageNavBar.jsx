import React, {useContext} from 'react';
import {COMMON_ACTIONS} from '../../state/constants/action-names';
import './PageNavBar.scss';

export default ({views, context}) => {
  const {data, dispatch} = useContext(context);
  const onPress = (id) => {
    dispatch({type: COMMON_ACTIONS.SET_VIEW, payload: id});
  };
  return (
    <div className="page-nav-container">
      {views.map((view) => {
        return (
          <button
            key={view.id}
            className={`page-nav-button ${
              view.id === data.view ? 'selected' : ''
            }`}
            onClick={() => {
              onPress(view.id);
            }}>
            {view.name}
          </button>
        );
      })}
    </div>
  );
};
