import React from 'react';

class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      info: {
        name: props.name,
        course: props.course,
        grade: props.grade
      },
      error: ''
    };
    this.id = props.id;
    this.initialInfo = { ...this.state.info };
    this.onDelete = props.onDelete;
    this.resetInfo = this.resetInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  resetInfo() {
    this.setState({ editing: false, info: this.initialInfo });
  }
  handleChange(event) {
    let info = { ...this.state.info };
    info[event.target.id] = event.target.value;
    this.setState({ info });
  }
  handleSubmit() {
    const wordPatt = /\w*[!@#$%^&*()]+\w*/g;
    const { name, course } = this.state.info;
    const grade = Number(this.state.info.grade);
    if (name.match(wordPatt) || name.length < 2 || name.length > 60) {
      this.setState({ error: 'Invalid Name' });
    } else if (course.match(wordPatt) || course.length < 2 || course.length > 60) {
      this.setState({ error: 'Invalid Course' });
    } else if (isNaN(grade) || grade < 0 || grade > 200) {
      this.setState({ error: 'Invalid Grade' });
    } else {
      this.setState({ editing: false, error: '' });
    }
  }
  render() {
    let infoElems, btnElems, errorClass;
    if (this.state.error === '') {
      errorClass = 'd-none';
    } else errorClass = '';
    if (this.state.editing) {
      btnElems = [
        <button onClick={ this.handleSubmit } key='confirm' className='btn btn-success mr-1'>Confirm</button>,
        <button onClick={this.resetInfo} key='cancel' className='btn btn-secondary mr-1'>Cancel</button>
      ];
      infoElems = [
        <td key='name'>
          <input onChange={this.handleChange} type="text" value={this.state.info.name} id='name'/>
        </td>,
        <td key='course'>
          <input onChange={this.handleChange} type="text" value={this.state.info.course} id='course' />
        </td>,
        <td key='grade'>
          <input onChange={this.handleChange} type="text" value={this.state.info.grade} id='grade' />
        </td>
      ];
    } else {
      btnElems = [
        <button onClick={() => this.setState({ editing: true }) } key='edit' className='btn btn-primary mr-1'>Edit</button>,
        <button onClick={() => this.onDelete(this.id)} key='delete' className='btn btn-danger'>X</button>
      ];
      infoElems = [
        <td key='name'>{this.state.info.name}</td>,
        <td key='course'>{this.state.info.course}</td>,
        <td key='grade'>{this.state.info.grade}</td>
      ];
    }
    return (
      <tr>
        {infoElems}
        <td className='d-flex flex-wrap justify-content-end'>
          <div className={'alert alert-danger w-100 ' + errorClass}>{this.state.error}</div>
          <div>
            {btnElems}
          </div>
        </td>
      </tr>
    );
  }
}

export default Grade;
