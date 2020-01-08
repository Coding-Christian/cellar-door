import React from 'react';
import InputField from './inputField';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: '',
      validName: false,
      validCourse: false,
      validGrade: false
    };
    this.onSubmit = props.onSubmit;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value }, this.validateForm);
  }
  validateForm() {
    const wordPatt = /[^\w\s]/g;
    const { name, course, grade } = this.state;
    this.setState({
      validName: !(wordPatt.test(name) || name.length < 2 || name.length > 60),
      validCourse: !(wordPatt.test(course) || course.length < 2 || course.length > 60),
      validGrade: !(grade.length < 1 || isNaN(Number(grade)) || Number(grade) < 0 || Number(grade) > 200)
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.validName && this.state.validCourse && this.state.validGrade) {
      const status = await this.onSubmit(this.state.name, this.state.course, this.state.grade);
      if (status < 300) {
        this.setState({ name: '', course: '', grade: '', error: '' });
      } else {
        this.setState({ error: 'Could not reach server. Please try again.' });
      }
    }
  }
  handleClear(event) {
    this.setState({ name: '', course: '', grade: '', validName: false, validCourse: false, validGrade: false });
  }
  render() {
    let disabledClass = '';
    if (!this.state.validName || !this.state.validCourse || !this.state.validGrade) {
      disabledClass = 'disabled';
    }
    return (
      <form onSubmit={this.handleSubmit} className='order-1 order-md-2 mb-4 col-xs-12 col-md-3'>
        <div className="form-group">
          <InputField handleChange={this.handleChange} placeholder='Name' value={this.state.name} isValid={this.state.validName} id='name' faClass='fas fa-user-graduate'/>
          <div className='invalid-feedback'>Name must be between 2 and 60, alphanumeric characters</div>
          <InputField handleChange={this.handleChange} placeholder='Course' value={this.state.course} isValid={this.state.validCourse} id='course' faClass='fas fa-book'/>
          <div className='invalid-feedback'>Name must be between 2 and 60, alphanumeric characters</div>
          <InputField handleChange={this.handleChange} placeholder='Grade' value={this.state.grade} isValid={this.state.validGrade} id='grade' faClass='fas fa-percent'/>
          <div className='invalid-feedback'>Please enter a valid number for grade</div>
        </div>
        <button className={`btn btn-primary col-5 col-md-12 col-lg-4 offset-lg-3 mb-2 ${disabledClass}`} type='submit'>Submit</button>
        <button onClick={this.handleClear} className='btn btn-secondary col-5 col-md-12 col-lg-4 offset-2 offset-md-0 offset-lg-1 mb-2' type='button'>Cancel</button>
      </form>
    );
  }
}

export default GradeForm;
