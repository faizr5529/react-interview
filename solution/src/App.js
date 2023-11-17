import './App.css';
import { getLocations } from './mock-api/apis';
import { isNameValid } from './mock-api/apis'; 
import React, { useState, useEffect  } from 'react';
import { nanoid } from 'nanoid'

/* For implementation I decided that the delete button would delete
all rows in the table as this is the most efficient way of clearing the data */
function App() {

  const [locations, setData] = useState([]);
  const [name, setName] = useState(true);
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    locationName: 'Canada'
  })

  const [contacts, setContacts ] = useState([]);

  useEffect(() => {
    // Assuming fetchData is a function that returns a promise
    getLocations()
      .then(responseData => {
        // Handle the data here
        setData(responseData);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    // Assuming fetchData is a function that returns a promise
    isNameValid(name)
      .then(responseData => {
        // Handle the data here
        setName(responseData);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      locationName: addFormData.locationName
    }

    const newContacts = [...contacts, newContact];
    setContacts(newContacts)
  }

  const handleDeleteClick = (event) => {
    event.preventDefault();
    setContacts([])
  }
 
  return (
    <div className="App">
      <form onSubmit={handleAddFormSubmit}>
        <label>Name</label>
        <input
          type="text"
          required
          name="fullName"
          onChange={handleAddFormChange}>
        </input>
        { !name &&
        <h3 className="error"> this name is already taken </h3> }
        <label>Location</label>
        <select 
        name="locationName"
        selected="selected"
        onChange={handleAddFormChange}> 
        {locations.map( (location) => <option value={location} key={location}>{location}</option> )}
        </select>
        <button type="submit"> Add </button> <button onClick={handleDeleteClick}> Delete </button>
        
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map( (contact) => (
              <tr>
                <td>{contact.fullName}</td>
                <td>{contact.locationName}</td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </form>
    </div>
  );
}

export default App;
