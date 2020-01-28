import React from 'react';
import InputField from './inputField';
import SelectField from './selectField';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advancedOptions: false,
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
        value: '',
        options: []
      },
      location: {
        title: 'Location',
        value: '',
        options: []
      }
    };
    this.onSubmit = props.onSubmit;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
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
  handleChange(event) {
    // let newFieldState = Object.assign(this.state[event.target.id]);
    // newFieldState.value = event.target.value;
    // this.setState({ [event.target.id]: newFieldState }, this.validateForm);
  }
  validateForm() {
    // const wordPatt = /[^\w\s]/g;
    // const numPatt = /[^\d.]/g;
    // let name = Object.assign(this.state.name);
    // let course = Object.assign(this.state.course);
    // let grade = Object.assign(this.state.grade);
    // name.isValid = !(wordPatt.test(name.value) || name.value.length < 2 || name.value.length > 60);
    // course.isValid = !(wordPatt.test(course.value) || course.value.length < 2 || course.value.length > 60);
    // grade.isValid = !(numPatt.test(grade.value) || isNaN(Number(grade.value)) || Number(grade.value) < 0 || Number(grade.value) > 200);
    // this.setState({ name, course, grade });
  }
  async handleSubmit(event) {
    // event.preventDefault();
    // if (this.state.name.isValid && this.state.course.isValid && this.state.grade.isValid) {
    //   const status = await this.onSubmit(this.state.name.value, this.state.course.value, this.state.grade.value);
    //   if (status < 300) {
    //     this.handleClear();
    //   } else {
    //     this.setState({ error: 'Could not reach server. Please try again.' });
    //   }
    // }
  }
  handleClear(event) {
    // let newState = {
    //   name: Object.assign(this.state.name),
    //   course: Object.assign(this.state.course),
    //   grade: Object.assign(this.state.grade)
    // };
    // for (const field in newState) {
    //   newState[field].value = '';
    //   newState[field].isValid = false;
    // }
    // this.setState(newState);
  }
  componentDidMount() {
    this.getAllLocations();
  }
  render() {
    let disabledClass = '';
    if (!this.state.name.isValid || !this.state.amount.isValid || !this.state.location.isValid) {
      disabledClass = 'disabled';
    }
    return (
      <form onSubmit={this.handleSubmit} className='order-1 order-md-2 mb-4 col-12 col-md-3'>
        <div className="form-group">
          <InputField handleChange={this.handleChange} id='name' field={this.state.name} faClass='fas fa-pencil-alt'/>
          <InputField handleChange={this.handleChange} id='amount' field={this.state.amount} faClass='fas fa-weight'/>
          <SelectField handleChange={this.handleChange} id='unit' field={this.state.unit} faClass='fas fa-ruler-combined'/>
          <SelectField handleChange={this.handleChange} id='location' field={this.state.location} faClass='far fa-compass'/>
        </div>
        <button className={`btn btn-primary col-5 col-md-12 col-lg-4 offset-lg-3 mb-2 ${disabledClass}`} type='submit'>Submit</button>
        <button onClick={this.handleClear} className='btn btn-secondary col-5 col-md-12 col-lg-4 offset-2 offset-md-0 offset-lg-1 mb-2' type='button'>Cancel</button>
      </form>
    );
  }
}

export default GradeForm;