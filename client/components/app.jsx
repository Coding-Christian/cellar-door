import React from 'react';
import Header from './header';
import GroceryTable from './groceryTable';
import GroceryForm from './groceryForm';
import LocationTable from './locationTable';
import LocationForm from './locationForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries: [],
      locations: [],
      view: 'groceries'
    };
    this.addNewGrocery = this.addNewGrocery.bind(this);
    this.addNewLocation = this.addNewLocation.bind(this);
    this.deleteGroceryItem = this.deleteGroceryItem.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.updateGroceryItem = this.updateGroceryItem.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.changeView = this.changeView.bind(this);
  }
  getAllItems(endpoint) {
    fetch(`/api/${endpoint}`)
      .then(response => response.json())
      .then(data => this.setState({ [endpoint]: data }));
  }
  async addNewGrocery(grocery) {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grocery)
    };
    try {
      const response = await fetch('/api/groceries', config);
      this.getAllItems('groceries');
      return response.status;
    } catch {
      this.getAllItems('groceries');
      return 503;
    }
  }
  async addNewLocation(location) {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(location)
    };
    try {
      const response = await fetch('/api/locations', config);
      this.getAllItems('locations');
      return response.status;
    } catch {
      this.getAllItems('locations');
      return 503;
    }
  }
  async updateGroceryItem(groceryItem) {
    const config = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(groceryItem)
    };
    try {
      const response = await fetch(`/api/groceries`, config);
      return response.status;
    } catch {
      return 503;
    }
  }
  async updateLocation(location) {
    const config = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(location)
    };
    try {
      const response = await fetch(`/api/locations`, config);
      return response.status;
    } catch {
      return 503;
    }
  }
  deleteGroceryItem(groceryItemId) {
    fetch(`/api/groceries/${groceryItemId}`, { method: 'DELETE' })
      .then(() => {
        const groceries = this.state.groceries.filter(grocery => !(grocery.id === groceryItemId));
        this.setState({ groceries }, () => this.getAllItems('groceries'));
      });
  }
  async deleteLocation(locationId) {
    try {
      const response = await fetch(`/api/locations/${locationId}`, { method: 'DELETE' });
      if (response.status < 300) {
        const locations = this.state.locations.filter(location => !(location.id === locationId));
        this.setState({ locations }, () => this.getAllItems('locations'));
      } else {
        return response.status;
      }
    } catch {
      return 503;
    }
  }
  changeView(view) {
    this.setState({ view }, () => {
      if (this.state.view === 'groceries') {
        this.getAllItems('groceries');
      } else {
        this.getAllItems('locations');
      }
    });
  }
  componentDidMount() {
    this.getAllItems('groceries');
  }
  render() {
    let form, table;
    if (this.state.view === 'groceries') {
      form = (<GroceryForm onAdd={this.addNewGrocery}/>);
      table = (
        <GroceryTable
          onDelete={this.deleteGroceryItem}
          onUpdate={this.updateGroceryItem}
          groceries={this.state.groceries}
        />
      );
    } else {
      form = (<LocationForm onAdd={this.addNewLocation}/>);
      table = (
        <LocationTable
          locations={this.state.locations}
          onDelete={this.deleteLocation}
          onUpdate={this.updateLocation}
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
            {form}
          </div>
        </div>
      </div>
      <p className='text-center text-muted'>* This app is currently a demo. All data will be deleted every 60 minutes.</p>
    </>);
  }
}

export default App;
