import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Leave() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/getLeaveRequests')
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error fetching leave requests");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/deleteLeave/' + id)
      .then(res => {
        if (res.data.Status === "Success") {
          setData(data.filter(leave => leave.id !== id)); // Update state without refreshing the page
        } else {
          alert("Error deleting leave request");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Leave Requests</h3>
      </div>
      <Link to="/createLeave" className='btn btn-success'>Add Leave Request</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((leave, index) => {
              return (
                <tr key={index}>
                  <td>{leave.employeeName}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.status}</td>
                  <td>
                    <Link to={`/editLeave/${leave.id}`} className='btn btn-primary btn-sm me-2'>Edit</Link>
                    <button onClick={() => handleDelete(leave.id)} className='btn btn-sm btn-danger'>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leave;
