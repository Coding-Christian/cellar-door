import React from 'react';

class LocationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      description: props.description,
      error: null,
      editing: false
    };
    this.id = props.locationId;
    this.onDelete = props.onDelete;
    this.handleDelete = this.handleDelete.bind(this);
  }
  async handleDelete() {
    const status = await this.onDelete(this.id);
    if (status >= 300) {
      this.setState({ error: status }, () =>
        setTimeout(() => this.setState({ error: null }), 3000)
      );
    }
  }
  render() {
    let error = '';
    if (this.state.error === 409) {
      error = (
        <div className="col-12 my-1">
          <small className='text-danger'>Please move groceries in this location before deleteing.</small>
        </div>
      );
    } else if (this.state.error) {
      error = (
        <div className="col-12 my-1">
          <small className='text-danger'>{this.state.error} Error occurred. Please try again.</small>
        </div>
      );
    }
    return (
      <tr>
        <td key='name'>{this.state.name}</td>
        <td key='description'>{this.state.description}</td>
        <td key='operations'>
          <div className="row">
            <div className='col-12 col-xl-4 my-1'>
              <button onClick={() => this.setState({ editing: !this.state.editing })} className='btn btn-outline-info w-100'>
                {this.state.editing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className='col-12 col-xl-4 my-1'>
              <button onClick={this.handleDelete} className={`btn btn-danger w-100`}>
                Delete
              </button>
            </div>
            {error}
          </div>
        </td>
      </tr>
    );
  }
}

export default LocationItem;
