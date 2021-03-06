// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { changeDateRange } from '../../actions/time';

type DateRangeType = {
  dateRange: dateRanges,
  changeDateRange: (dateRange: dateRanges) => void,
};

class DateRange extends Component<DateRangeType> {
  constructor(props) {
    super(props);

    this.toggleToday = () => { props.changeDateRange('today'); };
    this.toggleThisWeek = () => { props.changeDateRange('week'); };
    this.toggleLastMonth = () => { props.changeDateRange('month'); };
    this.toggleOlder = () => { props.changeDateRange('older'); };
  }

  toggleToday: () => void;
  toggleThisWeek: () => void;
  toggleLastMonth: () => void;
  toggleOlder: () => void;

  render() {
    const { dateRange } = this.props;

    return (
      <Menu secondary>
        <Menu.Item
          active={dateRange === 'today'}
          onClick={this.toggleToday}
        >
          Today
        </Menu.Item>
        <Menu.Item
          active={dateRange === 'week'}
          onClick={this.toggleThisWeek}
        >
          This week
        </Menu.Item>
        <Menu.Item
          active={dateRange === 'month'}
          onClick={this.toggleLastMonth}
        >
          Last month
        </Menu.Item>
        <Menu.Item
          active={dateRange === 'older'}
          onClick={this.toggleOlder}
        >
          Older
        </Menu.Item>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  const { dateRange } = state.time;

  return { dateRange };
}

function mapDispatchToProps(dispatch) {
  return {
    changeDateRange(dateRange: dateRanges) {
      dispatch(changeDateRange(dateRange));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DateRange);
