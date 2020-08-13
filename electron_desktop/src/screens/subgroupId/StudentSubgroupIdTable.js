import React from "react";
import "./StudentSubgroupIdTable.css";
const StudentSubgroupIdTable = ({
  userData,
  Handlebox,
  handleDelete,
  gotoUpdatePage,
}) => {
  return (
    <table className="table table-dark table-hover StudentSubGroupId__table">
      <thead>
        <tr>
          <th>Sub Group Number</th>
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
                <span>{data.sub_groupid}</span>
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

export default StudentSubgroupIdTable;
