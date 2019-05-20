import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = ({startLogout}) => (
  <header className='header'>
    <div className="content-container">
      <div class="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Gastos App</h1>
        </Link>
        <button  className='button button--link'onClick={startLogout}>Cerrar sesión</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);

