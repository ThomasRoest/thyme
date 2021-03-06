// @flow

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Image, Menu, Modal } from 'semantic-ui-react';
import classnames from 'classnames';

import { clearAlert } from '../../actions/app';

import thyme from './Thyme.svg';
import './App.css';
import './print.css';

function AppLink(name, path, currentPath) {
  return (
    <Link
      className={classnames('item', { active: currentPath === path })}
      to={path}
    >
      {name}
    </Link>
  );
}

type AppType = {
  location: RouterLocation,
  children: any,
  alertMessage: string,
  onCloseAlert: () => void,
}

function App({
  location,
  children,
  alertMessage,
  onCloseAlert,
}: AppType) {
  return (
    <div className="App">
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <Image size="mini" src={thyme} alt="Thyme" style={{ width: 24, marginRight: '1.5em' }} />
            Thyme
          </Menu.Item>
          {AppLink('Timesheet', '/', location.pathname)}
          {AppLink('Reports', '/reports', location.pathname)}
          {AppLink('Projects', '/projects', location.pathname)}
          {AppLink('Settings', '/settings', location.pathname)}
        </Container>
      </Menu>
      <Container fluid style={{ marginTop: '5em' }}>
        <Modal
          open={alertMessage !== ''}
          onClose={onCloseAlert}
          content={alertMessage}
          size="mini"
          actions={[
            { key: 'OK', content: 'OK', positive: true },
          ]}
        />

        {children}
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    alertMessage: state.app.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCloseAlert() {
      dispatch(clearAlert());
    },
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
