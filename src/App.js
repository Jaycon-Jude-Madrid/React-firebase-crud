import { useState, useEffect } from "react";
import { db } from './firebaseconfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc,doc } from 'firebase/firestore';

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const UsersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(UsersCollectionRef);
      setUsers(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
    }
    getUsers();
  }, [])
  const createUser = async () => {
    await addDoc(UsersCollectionRef, { name: newName, age: Number(newAge) });
  };
  const updateUser = async (id, age) => {

    const newFields = {
      age: age + 1
    }

    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, newFields)
  };
  const DecreaseAge = async (id, age) => {

    const newFields = {
      age: age - 1
    }

    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, newFields)
  };
  const ChangeName = async (id) => {

    const newFields = {
      name: newName
    }
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, newFields)
  }

  const ChangeAge = async (id) => {
    const newFields = {
      age: newAge
    }
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, newFields)
  }

  const deleteUser = async (id) =>{
    
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)
  }
  return (
    <div className="App">

      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />

      <button onClick={createUser}> Create User</button>

      {users.map((user) => {
        return (
          <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <input placeholder="name" onChange={(event) => {
              setNewName(event.target.value);
            }} />
            <input placeholder="age" onChange={(event) => {
              setNewAge(event.target.value);
            }} />
            <button onClick={() => { ChangeName(user.id, user.name) }}>Change Name</button>
            <button onClick={() => { ChangeAge(user.id, user.age) }}>Change age</button>
            <button onClick={() => { updateUser(user.id, user.age) }}>Increased age</button>
            <button onClick={() => { DecreaseAge(user.id, user.age) }}>Decrease age</button>
            <button onClick={() => { deleteUser(user.id, user.age) }}>Delete User</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
