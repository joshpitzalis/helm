import React from 'react';
import { authState } from 'rxfire/auth';
import firebase from '../../utils/firebase';

export const useAuth = () => {
  const [user, setUser] = React.useState(false);

  React.useEffect(() => {
    const userListener = authState(firebase.auth()).subscribe(_user => {
      if (_user) {
        setUser(_user);
      } else {
        setUser(false);
      }
    }, []);

    return () => userListener.unsubscribe();
  }, []);

  return user;
};

// when signing in with email checkout https://usehooks.com/useAuth/
