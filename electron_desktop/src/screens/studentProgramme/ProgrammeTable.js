import React from "react";
import "./ProgrammeTable.css";
const ProgrammeTable = ({
  userData,
  Handlebox,
  handleDelete,
  gotoUpdatePage,
}) => {
  return (
    <table className="table table-dark table-hover ProgrammeContainer__table">
      <thead>
        <tr>
          <th>programme</th>
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
                <span>{data.programme}</span>
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

export default React.memo(ProgrammeTable);
