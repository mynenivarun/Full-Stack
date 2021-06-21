import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SignOut from './SignOut';
import RepositoryView from './RepositoryView';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import ReviewList from './ReviewList';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/createreview" exact>
          <CreateReview />
        </Route>
        <Route path="/reviews" exact>
          <ReviewList />
        </Route>
        <Route path="/signout" exact>
          <SignOut />
        </Route>
        <Route path="/repo/:id" exact>
          <RepositoryView />
        </Route>
        <Redirect to="/" />
      </Switch>
    </SafeAreaView>
  );
};

export default Main;