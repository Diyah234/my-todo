import React, { useState } from 'react';
import '../style.css';
import dark from '../images/bg-desktop-dark.jpg';
import sun from '../images/icon-sun.svg';
import cross from '../images/icon-cross.svg';
import mobiledark from '../images/bg-mobile-dark.jpg';
import light from '../images/bg-desktop-light.jpg';
import mobilelight from '../images/bg-mobile-light.jpg';

function App() {
  // State hooks to manage input text, todo items, and filter
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');

  const [lightMode, setLightMode] = useState(false);

  const handleLightModeChange = () => {
    setLightMode(!lightMode);
  };
  // Function to handle filter selection
  function handleFilter(filter) {
    setFilter(filter);
  }

  // Function to handle input change
  function handleChange(event) {
    setInputText(event.target.value);
  }

  // Function to add a new todo item
  function addItem() {
    // Check if input is not empty
    if (inputText.trim() !== '') {
      // Add the new todo item to the list
      setItems((prevItems) => [
        ...prevItems,
        { text: inputText, completed: false },
      ]);
      // Clear the input field
      setInputText('');
    }
  }

  // Function to toggle completion status of a todo item
  function toggleComplete(index) {
    // Create a copy of the items array
    const updatedItems = [...items];
    // Toggle the completion status of the selected item
    updatedItems[index].completed = !updatedItems[index].completed;
    // Update the state with the modified items array
    setItems(updatedItems);
  }

  // Function to delete a todo item
  function deleteItem(index) {
    // Filter out the item to be deleted
    const updatedItems = items.filter((_, i) => i !== index);
    // Update the state with the modified items array
    setItems(updatedItems);
  }

  // Function to clear completed todo items
  function clearCompleted() {
    // Filter out the completed items
    const remainingItems = items.filter((item) => !item.completed);
    // Update the state with the remaining items
    setItems(remainingItems);
  }

  // Filter the items based on the selected filter
  const filteredItems = items.filter((todoItem) => {
    if (filter === 'All') {
      return true;
    } else if (filter === 'Active') {
      return !todoItem.completed;
    } else if (filter === 'Completed') {
      return todoItem.completed;
    }
    return false;
  });

  const mobile = window.matchMedia('(max-width: 475px)');

  // const darkModeMobile = mobile ? url(${mobiledark}) : url(${dark});

  // const lightModelMobile = mobile ? url(${mobilelight}) : url(${light});

  let darkModeMobile;
  let lightModelMobile;

  if (mobile === true) {
    darkModeMobile = `url(${mobiledark})`;
    lightModelMobile = `url(${mobilelight})`;
  } else {
    darkModeMobile = `url(${dark})`;
    lightModelMobile = `url(${light})`;
  }
 
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          backgroundImage: lightMode ? lightModelMobile : darkModeMobile,
          backgroundRepeat: 'no-repeat',
          flex: 1,
        }}className='bg'
      ></div>
      <div
        style={{
          backgroundColor: lightMode ? 'hsl(236, 33%, 92%)' : 'hsl(235, 21%, 11%)',
          flex: 1,
          padding: '40px'
        }} className='dark'
      ></div>{' '}
      <div className="box">
        <div className="flex todo">
          <h1>TODO</h1>
          <img src={sun} alt="sun icon" onClick={handleLightModeChange} />
        </div>
        <div className="flex inp" style={{backgroundColor: lightMode ? '#f0f4f6' : '#25273c'}}>
          <div>
            <input
              type="text"
              placeholder="Create a new todo..."
              value={inputText}
              onChange={handleChange}
              style={{backgroundColor: lightMode ? '#f0f4f6' : '#25273c', color: lightMode ? 'hsl(235, 19%, 35%)': 'hsl(0, 0%, 98%)'}}
            />
          </div>
          <button onClick={addItem}>ADD</button>
        </div>
        <div className="ctn" style={{backgroundColor: lightMode ? '#f0f4f6' : '#25273c'}}>
          {filteredItems.map((todoItem, index) => (
            <div className="flex ctn1" key={index}>
              <div className="flex2">
                {/* Clicking on the circle toggles completion status */}
                <div
                  className={todoItem.completed ? 'selected' : 'circle'}
                  onClick={() => toggleComplete(index)}
                ></div>
                <span
                  style={{
                    textDecoration: todoItem.completed
                      ? 'line-through'
                      : 'none',
                      color: lightMode ? 'hsl(235, 19%, 35%)': 'hsl(0, 0%, 98%)'
                  }}
                >
                  {todoItem.text}
                </span>
              </div>
              {/* Clicking on the delete icon deletes the item */}
              <img src={cross} onClick={() => deleteItem(index)} alt="delete" />
            </div>
          ))}
          <div className="flex last">
            {/* Display the number of active items */}
            <div>
              <p>
                <span>{items.filter((item) => !item.completed).length}</span>{' '}
                items left
              </p>
            </div>
            <div className="flex2">
              {/* Filter buttons */}
              <p onClick={() => handleFilter('All')} style={{color: filter ==='All' ? 'hsl(220, 98%, 61%)' : 'inherit'}} className={filter !== 'All' ? 'hovers' : ''}>All</p>
              <p onClick={() => handleFilter('Active')} style={{color: filter ==='Active' ? 'hsl(220, 98%, 61%)' : 'inherit'}} className={filter !== 'Active' ? 'hovers' : ''}>Active</p>
              <p onClick={() => handleFilter('Completed')} style={{color: filter ==='Completed' ? 'hsl(220, 98%, 61%)' : 'inherit'}} className={filter !== 'Completed' ? 'hovers' : ''}>Completed</p>
            </div>
            <div>
              <p onClick={clearCompleted} className={lightMode ? 'no-hover' : 'hovers'}>Clear Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default App;
