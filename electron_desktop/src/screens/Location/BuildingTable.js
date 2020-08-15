import React from "react";
import "./BuildingTable.css";
const BuildingTable = ({
  userData,
  Handlebox,
  handleDelete,
  gotoUpdatePage,
}) => {
  return (
    <table className="table table-dark table-hover locationContainer__table">
      <thead>
        <tr>
          <th>Building</th>
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
                  onChange={(e) => Handlebox(e, data)}
                  type="checkbox"
                  value={data.id}
                  className="form-check-input"
                  checked={data.isChecked}
                />
                <span>{data.building}</span>
              </div>
            </td>
            <td>
              <button onClick={(e) => handleDelete(data)}>Delete</button>
            </td>
            <td>
              <button onClick={(e) => gotoUpdatePage(data)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BuildingTable;
