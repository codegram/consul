import { Component, PropTypes }     from 'react';
import { connect }                  from 'react-redux';

import * as actions                 from '../filters/filters.actions';

import SearchFilter                 from '../filters/search_filter.component';
import ScopeFilterOptionGroup       from '../filters/scope_filter_option_group.component';
import CategoryFilterOptionGroup    from '../filters/category_filter_option_group.component';
import SubcategoryFilterOptionGroup from '../filters/subcategory_filter_option_group.component';
import UserInteractionFilter        from '../filters/user_interaction_filter.component';

import FilterOptionGroup            from '../filters/filter_option_group.component';
import FilterOption                 from '../filters/filter_option.component';

class ProposalsFilters extends Component {
  render() {
    return (
      <form className="proposal-filters">
        <SearchFilter searchText={this.props.filters.text} />

        <FilterOptionGroup
          filterGroupName="source"
          filterGroupValue={this.props.filters.filter["source"]}
          isExclusive={true}
          onChangeFilterGroup={(name, value) => this.props.setFilterGroup(name, value) }>
        <FilterOption filterName="official" />
        <FilterOption filterName="citizenship" />
        <FilterOption filterName="organization" />
        <FilterOption filterName="meetings" filterLabel={I18n.t('components.filter_option.from_meetings')} />
        </FilterOptionGroup>

        <UserInteractionFilter />
        <ScopeFilterOptionGroup />
        <CategoryFilterOptionGroup />
        <SubcategoryFilterOptionGroup />
        <FilterOptionGroup 
          filterGroupName="other" 
          filterGroupValue={this.props.filters.filter["other"]}
          onChangeFilterGroup={(name, value) => this.props.setFilterGroup(name, value) }>
          <FilterOption filterName="meetings" />
        </FilterOptionGroup>
        {this.renderClearFilterLink()}
      </form>
    )
  }

  renderClearFilterLink() {
    if (Object.keys(this.props.filters.filter).length > 0 || this.props.filters.text.length > 0) {
      return (
        <div className="columns small-12">
          <a
            className="button expanded hollow"
            onClick={() => this.props.clearFilters()}>{I18n.t('components.proposal_filters.clean_filters')}</a>
        </div>
      )
    }
    return null;
  }
}

export default connect(
  ({ filters }) => ({ filters }),
  actions
)(ProposalsFilters);

ProposalsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilterGroup: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};
