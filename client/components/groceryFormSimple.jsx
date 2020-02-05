import React from 'react';
import InputField from './inputField';
import SelectField from './selectField';

class GroceryFormSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        title: 'Name',
        value: props.formValues.name,
        isValid: false,
        error: 'Name must be between 2 and 60 alphanumeric characters'
      },
      amount: {
        title: 'Amount',
        value: props.formValues.amount,
        isValid: false,
        error: 'Please enter a valid number for the amount'
      },
      unit: {
        title: 'Unit',
        value: props.formValues.unit,
        options: []
      },
      location: {
        title: 'Location',
        value: props.formValues.location,
        options: []
      },
      category: { value: props.formValues.category },
      purchaseDate: { value: props.formValues.purchaseDate },
      expirationDate: { value: props.formValues.expirationDate },
      notes: { value: props.formValues.notes }
    };
    this.toggleForm = props.toggleForm;
    this.onSubmit = props.onSubmit;
    this.changeFormStatus = props.changeFormStatus;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
  handleChange(event) {
    let newFieldState = Object.assign(this.state[event.target.id]);
    newFieldState.value = event.target.value;
    this.setState({ [event.target.id]: newFieldState }, this.validateForm);
  }
  validateForm() {
    const wordPatt = /[^\w\s]/g;
    const numPatt = /[^\d.]/g;
    let name = Object.assign(this.state.name);
    let amount = Object.assign(this.state.amount);
    name.isValid = !(wordPatt.test(name.value) || name.value.length < 2 || name.value.length > 60);
    amount.isValid = !(numPatt.test(amount.value) || isNaN(Number(amount.value)) || Number(amount.value) <= 0);
    this.setState({ name, amount }, () => {
      this.changeFormStatus(this.state.name.isValid && this.state.amount.isValid);
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.isValid && this.state.amount.isValid) {
      const status = await this.onSubmit(
        this.state.name.value,
        '1',
        this.state.amount.value,
        this.state.amount.value,
        this.state.unit.value,
        '1900-01-01',
        '1900-01-01',
        this.state.location.value,
        ''
      );
      if (status < 300) {
        this.handleClear();
      } else {
        this.setState({ error: 'Could not reach server. Please try again.' });
      }
    }
  }
  handleClear() {
    const newState = {
      name: Object.assign(this.state.name),
      amount: Object.assign(this.state.amount),
      unit: Object.assign(this.state.unit),
      location: Object.assign(this.state.location)
    };
    for (const property in newState) {
      if (property === 'name' || property === 'amount') {
        newState[property].value = '';
        newState[property].isValid = false;
      } else {
        newState[property].value = '1';
      }
    }
    this.setState(newState, () => {
      this.getAllLocations();
      this.getAllUnits();
      this.validateForm();
    });
  }
  handleToggle() {
    let formValues = {};
    for (const field in this.state) {
      formValues[field] = this.state[field].value;
    }
    this.toggleForm(formValues);
  }
  componentDidMount() {
    this.getAllLocations();
    this.getAllUnits();
    this.validateForm();
  }
  render() {
    let disabledClass = '';
    if (!this.state.name.isValid || !this.state.amount.isValid) {
      disabledClass = 'disabled';
    }
    return (
      <form onSubmit={this.handleSubmit} className='d-flex flex-column order-1 order-md-2 mb-4 col-12 col-md-3'>
        <div className="form-group mb-0">
          <InputField handleChange={this.handleChange} id='name' field={this.state.name} faClass='fas fa-pencil-alt'/>
          <InputField handleChange={this.handleChange} id='amount' field={this.state.amount} faClass='fas fa-weight'/>
          <SelectField handleChange={this.handleChange} id='unit' field={this.state.unit} faClass='fas fa-ruler-combined'/>
          <SelectField handleChange={this.handleChange} id='location' field={this.state.location} faClass='far fa-compass'/>
        </div>
        <button type='button' onClick={this.handleToggle} className='btn btn-link align-self-end px-0 mb-1'>+ Advanced Options</button>
        <div>
          <button className={`btn btn-primary col-5 col-md-12 col-lg-4 offset-lg-3 mb-2 ${disabledClass}`} type='submit'>Submit</button>
          <button type='button' onClick={this.handleClear} className='btn btn-secondary col-5 col-md-12 col-lg-4 offset-2 offset-md-0 offset-lg-1 mb-2'>Clear</button>
        </div>
      </form>
    );
  }
}

export default GroceryFormSimple;
