import { Component, PropTypes } from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers
}                               from 'redux';
import { Provider }             from 'react-redux';
import ReduxPromise             from 'redux-promise';

import { debate   }             from './debates.reducers';
import order                    from '../order/order.reducers';

import DebateShow               from './debate_show.component';

import pagination               from '../pagination/pagination.reducers';

const middlewares = [ReduxPromise];

// if (process.env.NODE_ENV === 'development') {
//   const createLogger = require('redux-logger');
//   const logger = createLogger();
//   middlewares.push(logger);
// }
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

function createReducers(sessionState, participatoryProcessIdState, stepIdState, decidimIconsUrlState) {
  let session = function (state = sessionState) {
    return state;
  };

  let participatoryProcessId = function (state = participatoryProcessIdState) {
    return state;
  };

  let stepId = function (state = stepIdState) {
    return state;
  };

  let decidimIconsUrl = function (state = decidimIconsUrlState) {
    return state;
  };

  return combineReducers({
    session,
    participatoryProcessId,
    stepId,
    decidimIconsUrl,
    debate,
    pagination,
    order
  });
}

export default class DebateApp extends Component {
  render() {
    return (
      <Provider 
        store={createStoreWithMiddleware(createReducers(this.props.session, this.props.participatory_process_id, this.props.step_id, this.props.decidim_icons_url))}>
        <DebateShow debateId={this.props.debateId} />
      </Provider>
    );
  }
}

DebateApp.propTypes = {
  session: PropTypes.object.isRequired,
  debateId: PropTypes.number.isRequired,
  participatory_process_id: PropTypes.string.isRequired,
  step_id: PropTypes.string.isRequired,
  decidim_icons_url: PropTypes.string.isRequired
};
