import { Component } from 'react';

import ProposalBadge from './proposal_badge.component';

export default class ProposalsTable extends Component {
  render() {
    const { proposals } = this.props;

    return (
      <table>
        <tbody>
          {
            proposals.sort((a, b) => b.total_votes - a.total_votes).map(proposal =>
              <tr key={proposal.id}>
                <td>
                  <ProposalBadge proposal={proposal} />
                </td>
                <td>
                  <a href={proposal.url} target="_blank">{proposal.title}</a>
                  <div>{proposal.summary}</div>
                </td>
                <td>{I18n.t("components.action_plan_proposals.votes", { votes: proposal.total_votes})}</td>
                <td>{I18n.t("components.action_plan_proposals.comments", { comments: proposal.total_comments})}</td>
                {this.renderRemoveButton(proposal)}
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }

  renderRemoveButton(proposal) {
    if (this.props.onRemoveProposal) {
      return (
        <td>
          <button onClick={(event) => this.props.onRemoveProposal(proposal) }>
            {I18n.t("components.proposals_table.remove")}
          </button>
        </td>
      );
    }
    return null;
  }
}
