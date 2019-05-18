import {startLogin, startLogout, login, logout} from '../../actions/auth';

test('Should generate login', () => {
  const uid = '123';
  const action = login(uid);
  expect(action).toEqual( { type: 'LOGIN', uid} )
})

test('Should generate logout', () => {
  const action = logout();
  expect(action).toEqual( { type: 'LOGOUT' })
})