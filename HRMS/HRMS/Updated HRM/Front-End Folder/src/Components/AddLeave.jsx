import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const [leave, setLeave] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
  });
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employees")
      .then((result) => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_leave', leave)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/leaves');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Leave Request</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="employeeName" className="form-label">
              Employee Name
            </label>
            <select
              id="employeeName"
              className="form-select rounded-0"
              onChange={(e) => setLeave({ ...leave, employeeName: e.target.value })}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.name}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="leaveType" className="form-label">
              Leave Type
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="leaveType"
              placeholder="Enter Leave Type"
              onChange={(e) => setLeave({ ...leave, leaveType: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="startDate"
              onChange={(e) => setLeave({ ...leave, startDate: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="endDate"
              onChange={(e) => setLeave({ ...leave, endDate: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="reason" className="form-label">
              Reason
            </label>
            <textarea
              className="form-control rounded-0"
              id="reason"
              rows="3"
              placeholder="Enter Reason"
              onChange={(e) => setLeave({ ...leave, reason: e.target.value })}
            ></textarea>
          </div>
          <div className="col-12">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              className="form-select rounded-0"
              onChange={(e) => setLeave({ ...leave, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Leave Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;
