import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

const now = moment();

class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: '',
            isAdding: props.expense ? 'Editar Gasto' : 'Agregar Gasto'
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    }
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note}));
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({amount}));
        }
    }
    onDateChange = (createdAt) => {
        (createdAt) && this.setState(() => ({createdAt}));
        
    }
    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(() => ({error: 'Ingresa un monto y descripción valida.'}));
        }else{
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    }
    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input
                        type='text'
                        placeholder="Descripción"
                        className="text-input"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type='text'
                        className="text-input"
                        value={this.state.amount}
                        placeholder="Monto (CLP)"
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        className="textarea"
                        placeholder="Agrega una nota (opcional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                   <div>
                   <button className="button">{this.state.isAdding}</button>
                   </div>
                </form>
            </div>
        );
    }
}

export {
    ExpenseForm as default
}