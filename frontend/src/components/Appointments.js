import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AppointmentBooking() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch list of doctors from backend
    axios.get('/api/doctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/appointments', formData)
      .then(response => {
        setMessage('Appointment booked successfully!');
        setFormData({
          patient_id: '',
          doctor_id: '',
          appointment_date: '',
        });
      })
      .catch(error => {
        console.error('Error booking appointment:', error);
        setMessage('Failed to book appointment.');
      });
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Book an Appointment</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient ID (username):</label>
          <input
            type="text"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Doctor:</label>
          <select
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} ({doctor.specialization})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Appointment Date:</label>
          <input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentBooking;
