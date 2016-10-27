import { Component, PropTypes } from 'react';

export default class ProposalStatusBadge extends Component {
  render() {
    const { answer } = this.props;
  
    if (answer) {
      const { status } = answer;

      if (status === 'accepted') {
        return (
          <span className="success label proposal-status">{I18n.t('components.proposal_status_badge.accepted')}</span>
        );
      } else if (status === 'rejected') {
        return (
          <span className="warning label proposal-status">{I18n.t('components.proposal_status_badge.rejected')}</span>
        );
      }
    }
    return null;
  }
}

ProposalStatusBadge.propTypes = {
  answer: PropTypes.object
};
