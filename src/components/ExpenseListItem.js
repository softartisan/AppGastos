import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({dispatch, id, description, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
        </Link>
        <p>
        {numeral(amount).format('$000,000,000')} 
        - 
        {moment(createdAt).format('DD MMMM YYYY')}
        </p>
    </div>
);

export default ExpenseListItem;