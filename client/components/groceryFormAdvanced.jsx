import React from 'react';
import InputField from './inputField';
import SelectField from './selectField';
import DateField from './dateField';

class GroceryFormAdvanced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        title: 'Name',
        value: '',
        isValid: false,
        error: 'Name must be between 2 and 60 alphanumeric characters'
      },
      amount: {
        title: 'Amount',
        value: '',
        isValid: false,
        error: 'Please enter a valid number for the amount'
      },
      unit: {
        title: 'Unit',
        value: '1',
        options: []
      },
      location: {
        title: 'Location',
        value: '1',
        options: []
      },
      category: {
        title: 'Category',
        value: '1',
        options: []
      },
      purchaseDate: {
        title: 'Purchase Date',
        value: this.getCurrentDate()
      },
      expirationDate: {
        title: 'Expiration Date',
        value: this.getCurrentDate()
      },
      notes: {
        title: 'Notes',
        value: '',
        error: 'Notes must be limited to 256 characters'
      }
    };
    this.toggleForm = props.toggleForm;
    this.handleChange = this.handleChange.bind(this);
  }
  getCurrentDate() {
    const date = new Date();
    const formattedDate = `
      ${date.getFullYear()}-
      ${(date.getMonth() + 1).toString().padStart(2, '0')}-
      ${date.getDay().toString().padStart(2, '0')}`;
    return formattedDate;
  }
  getAllLocations() {
    fetch('/api/locations')
      .then(response => response.json())
      .then(locations => {
        const location = Object.assign(this.state.location);
        location.options = locations;
        this.setState({ location });
      });
  }
  getAllUnits() {
    fetch('/api/units')
      .then(response => response.json())
      .then(units => {
        const unit = Object.assign(this.state.unit);
        unit.options = units;
        this.setState({ unit });
      });
  }
  getAllCategories() {
    fetch('/api/categories')
      .then(response => response.json())
      .then(categories => {
        const category = Object.assign(this.state.category);
        category.options = categories;
        this.setState({ category });
      });
  }
  handleChange(event) {
    let newFieldState = Object.assign(this.state[event.target.id]);
    newFieldState.value = event.target.value;
    this.setState({ [event.target.id]: newFieldState });
  }
  componentDidMount() {
    this.getCurrentDate();
    this.getAllLocations();
    this.getAllUnits();
    this.getAllCategories();
  }
  render() {
    let disabledClass = '';
    if (!this.state.name.isValid || !this.state.amount.isValid || !this.state.location.isValid) {
      disabledClass = 'disabled';
    }
    return (
      <form onSubmit={this.handleSubmit} className='d-flex flex-column order-1 order-md-2 mb-4 col-12 col-md-3'>
        <div className="form-group mb-0">
          <InputField handleChange={this.handleChange} id='name' field={this.state.name} faClass='fas fa-pencil-alt'/>
          <InputField handleChange={this.handleChange} id='amount' field={this.state.amount} faClass='fas fa-weight'/>
          <SelectField handleChange={this.handleChange} id='unit' field={this.state.unit} faClass='fas fa-ruler-combined'/>
          <SelectField handleChange={this.handleChange} id='location' field={this.state.location} faClass='far fa-compass'/>
          <SelectField handleChange={this.handleChange} id='category' field={this.state.category} faClass='fas fa-list'/>
          <DateField handleChange={this.handleChange} id='purchaseDate' field={this.state.purchaseDate} faClass='far fa-calendar-alt'/>
          <DateField handleChange={this.handleChange} id='expirationDate' field={this.state.expirationDate} faClass='far fa-calendar-alt'/>
        </div>
        <button onClick={this.toggleForm} className='btn btn-link align-self-end px-0 mb-1'>- Advanced Options</button>
        <div>
          <button className={`btn btn-primary col-5 col-md-12 col-lg-4 offset-lg-3 mb-2 ${disabledClass}`} type='submit'>Submit</button>
          <button onClick={this.handleClear} className='btn btn-secondary col-5 col-md-12 col-lg-4 offset-2 offset-md-0 offset-lg-1 mb-2' type='button'>Clear</button>
        </div>
      </form>
    );
  }
}

export default GroceryFormAdvanced;
