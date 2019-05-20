import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import {startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';
import './playground/promises';
import LoadingPage from './components/LoadingPage';


const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

let hasRenderer = false;

const render = () => {
  if(!hasRenderer){
    ReactDOM.render(jsx, document.querySelector('#app'));
    hasRenderer = true;
  }
}

ReactDOM.render(<LoadingPage/>,document.querySelector('#app'));

firebase.auth().onAuthStateChanged((user) => {
  if(user){
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      render();
      if(history.location.pathname === '/'){
        history.push('/dashboard');
      }
    });
  }else{
    store.dispatch(logout());
    render();
    history.push('/');
  }
});



