import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import UserForm from './component/UserForm';



const url = "https://rest-api-without-db.herokuapp.com/users";

function App() {

  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // update
  const[selectedUser, setSelectedUser] = useState({
    username: "",
    email: ""
  });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

// =============================================================================  
// =============================================================================
// =============================================================================
  const getAllUsers = () => {

    fetch(url)
    .then((res) => {
      if(!res.ok){
        throw Error("Could not fetch")
      }
      return res.json()
    })
    .then((data) => {
      // console.log(data)
      // console.log(data.users)
      setUsers(data.users);
      // setIsLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      // setIsLoading(false);
    })
    .finally(()=> {
      setIsLoading(false);
    })

  }


  useEffect(() => {
    getAllUsers();

  }, [])

// =============================================================================  
// =============================================================================
// =============================================================================
  // delet user
  const handleDlete = (id) => {
    fetch(url+ `/${id}`, {
      method : "DELETE"
    })
    .then((res) => {
      if(!res.ok){
        throw Error("Could not delete")
      }
      getAllUsers();
    })
    .catch((err) => {
      setError(err.message);
    })
  }

// =============================================================================  

// =============================================================================
// add user
// =============================================================================

  // const addUser = (user) => {
  //   // console.log(user);
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type" : "application/json"
  //     },
  //     body: JSON.stringify(user)
  //   })
  //   .then((res) => {
  //     if(res.status === 201){
  //       getAllUsers();
  //     }else{
  //       throw new Error("could not created new user")
  //     }
  //   })
  //   .catch((err) => {
  //     setError(err.message);
  //   });

  // }
  // ==========================
  // দুটির যেকোন একটি করলেই হবে
  // ==========================
  const addUser = (user) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(user)
    })
    .then((res) => {
      if(!res.ok){
        throw Error("Could not Creat");
      }
      getAllUsers();
    })
    .catch((err) => {
      setError(err.message);
    });

  }
// =============================================================================  
// =============================================================================
// =============================================================================
// handleEdit
  const handleEdit = (id) => {
    setSelectedUserId(id);
    // alert(id);
    const filteredData = users. filter((user)=> user.id === id);
    // console.log(filteredData);

    setUpdateFlag(true);

    setSelectedUser({
      username: filteredData[0].username,
      email: filteredData[0].email,
    })
  }
// =============================================================================  
// =============================================================================
// =============================================================================
// handleUpdate
  const handleUpdate = (user) => {
    // console.log(user);
    fetch(url + `/${selectedUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(user)
    })
    .then((res) => {
      if(!res.ok){
        throw new Error("failed to update");
      }
      getAllUsers();
      setUpdateFlag(false);
    })
    .catch((err) => {
      setError(err.message);
    });
  }

// =============================================================================  
// =============================================================================
// =============================================================================

  return (
    <div className="App">
     <h1>User Management App</h1>
     {isLoading && <h2 style={{color:"orange"}}>Loading....</h2>}
     {error && <h2 style={{color:"red"}}>{error}</h2>}
    
      {/* no 1 class */}
     {/* <UserForm btnText="Add User" handleSubmitData={addUser}/> */}
      {/* no 12 class */}
      {updateFlag ? (
        <UserForm 
          btnText="Update User" 
          selectedUser={selectedUser} 
          handleSubmitData={handleUpdate} 
        />
      ) : (
        <UserForm btnText="Add User" handleSubmitData={addUser} />
      )}

    <section className='section'>
      {users && users.map((user)=>{
          const {id, username, email} = user;
        return(
          <article key={id} className="card">
            <p>{username}</p>
            <p>{email}</p>
            <button className='btn' onClick={()=>{handleEdit(id)}}>Edit</button>
            <button className='btn' onClick={()=>{handleDlete(id)}}>Delete</button>
          </article>
        )
      })}
    </section>
     
{/* দ্বিতীয় বন্ধনী ব্যবহার করলে রিটার্ন ব্যবহার করতে হবে-If you use the second bracket, you have to use the return*/}
    
    </div>
  );
}

export default App;
