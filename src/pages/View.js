import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getDatabase, ref, get } from 'firebase/database';
import fireDb from '../Firebase';
import { useParams } from 'react-router-dom';

const View = () => {
  const [contact, setContact] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactRef = ref(fireDb, `contacts/${id}`);
        const contactSnapshot = await get(contactRef);

        if (contactSnapshot.exists()) {
          setContact(contactSnapshot.val());
        } else {
          toast.error('Contact not found');
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchContact();

    // Clean up the listener when the component unmounts
    return () => {
      setContact({});
    };
  }, [id]);

  return (
    <>
      <div>
        <h2>Contact Details</h2>
        <p>Name: {contact.name}</p>
        <p>Email: {contact.email}</p>
        <p>Contact: {contact.contact}</p>
      </div>
    </>
  );
};

export default View;
