// rafcp
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const UserForm = ({handleSubmitData, btnText, selectedUser}) => {
    const [user, setUser] = useState({
        username: "",
        email: ""
    })

// =============================================================================  
// =============================================================================
// =============================================================================

useEffect(() => {
  setUser({
    username: selectedUser.username,
    email: selectedUser.email
  })
}, [selectedUser])
// =============================================================================  
// =============================================================================
// =============================================================================

const {username, email} = user;
// =============================================================================  
// =============================================================================
// =============================================================================
const handleChange = (e) => {
    const selectedField = e.target.name;
    const selectedValue = e.target.value;

    setUser(prevState => {
        return{...prevState,[selectedField]: selectedValue} 
        // selectedField ar valu mana (selectedValue)
    })
}
// =============================================================================  
// =============================================================================
// =============================================================================
const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user);
    handleSubmitData(user);
    setUser({
        username: "",
        email: ""
    })
}
// =============================================================================  
// =============================================================================
// =============================================================================

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>Username:</label>
        <input 
            type="text" 
            // value={user.username} 
            value={username}
            name="username" 
            id="username" 
            onChange={handleChange} 
            required
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input 
            type="email" 
            value={email} 
            name="email" 
            id="email" 
            onChange={handleChange} 
            required
        />
      </div>
      <button type='submit' className='btn'>{btnText}</button>
    </form>
  )
}

UserForm.defaultProps = {
  selectedUser : {
    username: '',
    email: ''
  } 
}

export default UserForm

