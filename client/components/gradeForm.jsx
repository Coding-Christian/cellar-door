import React from 'react';
import InputField from './inputField';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: '',
      error: ''
    };
    this.onSubmit = props.onSubmit;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  handleChange(event) {
    const field = event.target.id;
    const value = event.target.value;
    if (field === 'name') {
      this.setState({ name: value });
    } else if (field === 'course') {
      this.setState({ course: value });
    } else {
      this.setState({ grade: value });
    }
  }
  async handleSubmit(event) {
    event.preventDefault();
    const wordPatt = /\w*[!@#$%^&*()]+\w*/g;
    const { name, course, grade } = this.state;
    if (name.match(wordPatt) || name.length < 2 || name.length > 60) {
      this.setState({ error: 'Name must be 2 to 60 characters and may not contain any special symbols' });
    } else if (course.match(wordPatt) || course.length < 2 || course.length > 60) {
      this.setState({ error: 'Course must be 2 to 60 characters and may not contain any special symbols' });
    } else if (grade.length < 1 || isNaN(Number(grade)) || Number(grade) < 0 || Number(grade) > 200) {
      this.setState({ error: 'Please enter a valid grade' });
    } else {
      const status = await this.onSubmit(name, course, this.state.grade);
      if (status < 300) {
        this.setState({ name: '', course: '', grade: '', error: '' });
      } else {
        this.setState({ error: 'Could not reach server. Please try again.' });
      }
    }
  }
  handleClear(event) {
    this.setState({ name: '', course: '', grade: '', error: '' });
  }
  render() {
    const { error } = this.state;
    let errorClass = '';
    if (error === '') { errorClass = ' d-none'; }
    return (
      <form onSubmit={this.handleSubmit} className='order-1 order-md-2 mb-4 col-xs-12 col-md-3'>
        <div className="form-group">
          <InputField handleChange={this.handleChange} placeholder='Name' value={this.state.name} id='name' faClass='fas fa-user-graduate'/>
          <InputField handleChange={this.handleChange} placeholder='Course' value={this.state.course} id='course' faClass='fas fa-book'/>
          <InputField handleChange={this.handleChange} placeholder='Grade' value={this.state.grade} id='grade' faClass='fas fa-percent'/>
        </div>
        <button className='btn btn-primary col-5 col-md-12 col-lg-4 offset-lg-3 mb-2' type='submit'>Submit</button>
        <button onClick={this.handleClear} className='btn btn-secondary col-5 col-md-12 col-lg-4 offset-2 offset-md-0 offset-lg-1 mb-2' type='button'>Cancel</button>
        <div className={'alert alert-danger mt-4' + errorClass}>{this.state.error}</div>
      </form>
    );
  }
}

export default GradeForm;
