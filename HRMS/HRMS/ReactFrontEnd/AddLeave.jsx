import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddLeave() {
  const [leave, setLeave] = useState({
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'Pending'
  });
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/getEmployees')  // Adjust the endpoint as needed
      .then(res => {
        if (res.data.Status === 'Success') {
          setEmployees(res.data.Result);
        } else {
          alert("Error fetching employees");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/addLeave', leave)  // Adjust the endpoint as needed
      .then(res => {
        if (res.data.Status === 'Success') {
          navigate('/leave');  // Redirect to the leave page
        } else {
          alert("Error adding leave request");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Add Leave Request</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor='employeeName' className='form-label'>Employee</label>
          <select
            id='employeeName'
            className='form-select'
            onChange={e => setLeave({ ...leave, employeeName: e.target.value })}
          >
            <option value=''>Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.name}>{emp.name}</option>
            ))}
          </select>
        </div>
        <div className='col-12'>
          <label htmlFor='leaveType' className='form-label'>Leave Type</label>
          <input
            type='text'
            className='form-control'
            id='leaveType'
            placeholder='Enter Leave Type'
            autoComplete='off'
            onChange={e => setLeave({ ...leave, leaveType: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='startDate' className='form-label'>Start Date</label>
          <input
            type='date'
            className='form-control'
            id='startDate'
            onChange={e => setLeave({ ...leave, startDate: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='endDate' className='form-label'>End Date</label>
          <input
            type='date'
            className='form-control'
            id='endDate'
            onChange={e => setLeave({ ...leave, endDate: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='reason' className='form-label'>Reason</label>
          <textarea
            className='form-control'
            id='reason'
            rows='3'
            placeholder='Enter Reason'
            onChange={e => setLeave({ ...leave, reason: e.target.value })}
          ></textarea>
        </div>
        <div className='col-12'>
          <label htmlFor='status' className='form-label'>Status</label>
          <select
            id='status'
            className='form-select'
            onChange={e => setLeave({ ...leave, status: e.target.value })}
          >
            <option value='Pending'>Pending</option>
            <option value='Approved'>Approved</option>
            <option value='Rejected'>Rejected</option>
          </select>
        </div>
        <div className='col-12'>
          <button type='submit' className='btn btn-primary'>Submit Leave Request</button>
        </div>
      </form>
    </div>
  );
}

export default AddLeave;
