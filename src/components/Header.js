import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Inicio</NavLink>
        <NavLink to="/create" activeClassName="is-active">Crear</NavLink>
        
    </header>
);

export default Header;