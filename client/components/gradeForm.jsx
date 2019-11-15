import React from 'react';

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
      this.setState({ grade: Number(value) });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const namePatt = /\w{2,30}/g;
    const coursePatt = /\w{2,30}/g;
    const { name, course, grade } = this.state;
    if (!name.match(namePatt)) {
      this.setState({ error: 'Name can be no longer than 60 characters and may not contain any special symbols' });
    } else if (!course.match(coursePatt)) {
      this.setState({ error: 'Course can be no longer than 30 characters and may not contain any special symbols' });
    } else {
      this.onSubmit(name, course, grade);
      this.setState({ name: '', course: '', grade: '' });
    }
  }
  handleClear(event) {
    this.setState({ name: '', course: '', grade: '' });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className='order-1 order-md-2 mb-4 col-xs-12 col-md-4'>
        <div className='form-group'>
          <label htmlFor='name' className='pr-2 col-4'>Name</label>
          <input onChange={this.handleChange} value={this.state.name} className='col-8' type='text' id='name'/>
        </div>
        <div className='form-group'>
          <label htmlFor='course' className='pr-2 col-4'>Course</label>
          <input onChange={this.handleChange} value={this.state.course} className='col-8' type='text' id='course'/>
        </div>
        <div className='form-group'>
          <label htmlFor='grade' className='pr-2 col-4'>Grade</label>
          <input onChange={this.handleChange} value={this.state.grade} className='col-8' type='number' min={0} max={200} id='grade'/>
        </div>
        <button className='btn btn-primary col-3 offset-5' type='submit'>Submit</button>
        <button onClick={this.handleClear} className='btn btn-secondary col-3 offset-1' type='button'>Cancel</button>
      </form>
    );
  }
}

export default GradeForm;
