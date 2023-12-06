import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, get, push, set } from 'firebase/database';
import fireDb from '../Firebase';

const AddEdit = () => {
  const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
  const history = useNavigate();
  const { id } = useParams(); // Get the contact ID from the route parameters

  useEffect(() => {
    if (id) {
      // Fetch contact data for update
      const fetchContact = async () => {
        try {
          const contactRef = ref(fireDb, `contacts/${id}`);
          const contactSnapshot = await get(contactRef);

          if (contactSnapshot.exists()) {
            setFormData(contactSnapshot.val());
          } else {
            toast.error('Contact not found');
            history('/'); // Redirect to home page if contact is not found
          }
        } catch (error) {
          toast.error(error.message);
          history('/'); // Redirect to home page on error
        }
      };

      fetchContact();
    }
  }, [id, history]);

  const handleInputChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, contact } = formData;

    if (!name || !email || !contact) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      if (id) {
        // Update existing contact
        const contactRef = ref(fireDb, `contacts/${id}`);
        await set(contactRef, formData);
        toast.success('Contact Updated');
      } else {
        // Add new contact
        const contactsRef = ref(fireDb, 'contacts');
        await push(contactsRef, formData);
        toast.success('Contact Added');
      }

      setFormData({ name: '', email: '', contact: '' });
      setTimeout(() => history('/'), 500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'contact'].map((field) => (
          <div key={field} className="form-field">
            <label htmlFor={field}>
              {field === 'contact' ? 'Contact Number' : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              id={field}
              name={field}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddEdit;
