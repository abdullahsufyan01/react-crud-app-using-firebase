import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getDatabase, ref, get, remove } from 'firebase/database';
import fireDb from '../Firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [contacts, setContacts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const contactsRef = ref(fireDb, 'contacts');

    const fetchData = async () => {
      try {
        const contactsSnapshot = await get(contactsRef);

        if (contactsSnapshot.exists()) {
          setContacts(contactsSnapshot.val());
        } else {
          setContacts({});
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();

    // Clean up the listener when the component unmounts
    return () => {
      setContacts({});
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!id) {
        throw new Error('Invalid contact ID');
      }

      const contactRef = ref(fireDb, `contacts/${id}`);
      await remove(contactRef);
      toast.success('User Deleted');
      // Update the local state to reflect the deletion
      setContacts((prevContacts) => {
        const updatedContacts = { ...prevContacts };
        delete updatedContacts[id];
        return updatedContacts;
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(contacts).map((id, index) => {
              return (
                <tr key={id}>
                  <th>{index + 1}</th>
                  <td>{contacts[id].name}</td>
                  <td>{contacts[id].email}</td>
                  <td>{contacts[id].contact}</td>
                  <td>
                    <button onClick={() => handleUpdate(id)}>Update</button>
                    <button onClick={() => handleDelete(id)}>Delete</button>
                    <button onClick={() => handleView(id)}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
