// lib
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

// src

import Header from '../Header'
import Home from '../Home'
import app from '../app'
import Drivers from '../Drivers'
import Parents from '../Parents'
import Schools from '../Schools'
import CreateSchool from '../CreateSchool'
import EditSchool from '../EditSchool'
import Security from '../Security'
import LoadingView from '../LoadingView'
import NavigationBar from '../NavigationBar'

import styles from './MainDashboard.less'


const MainDashboardInner = ({
  onClickSignout,
  user,
  userDetails,
  error,
  authenticated,
  path,
  onRouteChange,
  isLoading,
  activePath,
}) => (
  <div className={styles.root}>
    <Choose>
      <When condition={authenticated && !isLoading}>
        <Header
          onClickSignout={onClickSignout}
          activePath={activePath}
          user={user}
          userDetails={userDetails}
          authenticated={authenticated}
          onRouteChange={onRouteChange}
        />

        <div className={styles.container}>
          <div className={styles.navigation}>
            <NavigationBar
              onRouteChange={onRouteChange}
              activePath={activePath}
            />
          </div>
          <div
            className={styles.content}
            style={{ boxShadow: activePath === 'home' ? 'none' : '' }}
          >
            <Switch>
              <Route path={`${path}`} exact component={Home} />
              <Route
                path={`${path}/schools`}
                exact
                component={Schools}
                user={user}
              />
              <Route
                path={`${path}/school/create`}
                exact
                component={CreateSchool}
                user={user}
              />
              <Route
                path={`${path}/school/edit/:id`}
                exact
                component={EditSchool}
                user={user}
              />
              <Route
                path={`${path}/drivers`}
                exact
                component={Drivers}
                user={user}
              />
              <Route
                path={`${path}/security`}
                exact
                component={Security}
                user={user}
              />
              <Route
                path={`${path}/parents`}
                exact
                component={Parents}
                user={user}
              />
              <Redirect to="/dashboard" />
            </Switch>
          </div>
        </div>
      </When>
      <When condition={error}>
        <div>{error}</div>
      </When>
      <Otherwise>
        <LoadingView />
      </Otherwise>
    </Choose>
  </div>
)

export default MainDashboardInner
