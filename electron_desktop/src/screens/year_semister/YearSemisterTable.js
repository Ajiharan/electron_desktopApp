import React from "react";
import "./YearSemisterTable.css";
const YearSemisterTable = ({ userData, Handlebox, handleDelete }) => {
  return (
    <table className="table table-dark table-hover YearViewContainer__table">
      <thead>
        <tr>
          <th>Year&Semister</th>
          <th>Action</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((data) => (
          <tr key={data.id}>
            <td>
              <div className="form-check">
                <input
                  onChange={(e) => Handlebox(e)}
                  type="checkbox"
                  value={data.id}
                  className="form-check-input"
                />
                <span>{data.year_semister}</span>
              </div>
            </td>
            <td>
              <button onClick={(e) => handleDelete(data)}>Delete</button>
            </td>
            <td>
              <button>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default YearSemisterTable;