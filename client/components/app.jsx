import React from 'react';
import Header from './header';
import GroceryTable from './groceryTable';
import GroceryForm from './groceryForm';
import LocationTable from './locationTable';
import LocationForm from './locationForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groceries: [], locations: [], view: 'groceries' };
    this.addNewItem = this.addNewItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.changeView = this.changeView.bind(this);
  }
  getAllItems(endpoint) {
    fetch(`/api/${endpoint}`)
      .then(response => response.json())
      .then(data => this.setState({ [endpoint]: data }));
  }
  async addNewItem(endpoint, item) {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    try {
      const response = await fetch(`/api/${endpoint}`, config);
      this.getAllItems(endpoint);
      return response.status;
    } catch {
      this.getAllItems(endpoint);
      return 503;
    }
  }
  async updateItem(endpoint, item) {
    const config = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    try {
      const response = await fetch(`/api/${endpoint}`, config);
      return response.status;
    } catch {
      return 503;
    }
  }
  async deleteItem(endpoint, itemId) {
    const config = { method: 'DELETE' };
    try {
      const response = await fetch(`/api/${endpoint}/${itemId}`, config);
      if (response.status < 300) {
        const newList = this.state[endpoint].filter(item => !(item.id === itemId));
        this.setState({ [endpoint]: newList }, () => this.getAllItems(endpoint));
      } else {
        return response.status;
      }
    } catch {
      return 503;
    }
  }
  changeView(view) {
    this.setState({ view }, () => this.getAllItems(this.state.view));
  }
  componentDidMount() {
    this.getAllItems('groceries');
  }
  render() {
    let Form, table;
    if (this.state.view === 'groceries') {
      Form = GroceryForm;
      table = (
        <GroceryTable
          onDelete={this.deleteItem}
          onUpdate={this.updateItem}
          groceries={this.state.groceries}
        />
      );
    } else {
      Form = LocationForm;
      table = (
        <LocationTable
          locations={this.state.locations}
          onDelete={this.deleteItem}
          onUpdate={this.updateItem}
        />
      );
    }
    return (<>
      <div>
        <Header title='Cellar Door' view={this.state.view} changeView={this.changeView}/>
        <div className="sgt container mt-2">
          <div className="row">
            <div className="table-responsive order-2 order-lg-1 col-12 col-lg-9">
              {table}
            </div>
            <Form onAdd={this.addNewItem}/>
          </div>
        </div>
      </div>
      <p className='text-center text-muted'>* This app is currently a demo. All data will be deleted every 60 minutes.</p>
    </>);
  }
}

export default App;
