//view 

import React, { useState, useEffect } from "react";
import ScreenNav from "../screen-nav/ScreenNav";
import { useDispatch, useSelector } from "react-redux";
import { viewWorkingdays } from "../../redux/Working_days/WorkingdaysAction";
import { DotLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
import Search from "../home/Search";
import { Spinner } from "../animations/Spinner";
import "./Viewworkingdays.css"


const Viewworkingdays = () => {
   const {loading,error,workingdays } = useSelector(
     (state) => state.get_workingdays
   );

  const dispatch = useDispatch();
  const [WorkingdaysData, setWorkingdaysData] = useState([]);
  const [checkData, setCheckData] = useState([]);
  const history = useHistory();

 
  const navData = [
    {
      id: 1,
      name: "TimeTable > ",
      pathname: "/",
    },
    {
      id: 2,
      name: "View Working Days and Hours",
      pathname: "/workingdays/view",
    },
  ];

  useEffect(() => {
    dispatch(viewWorkingdays());
  }, []);

  useEffect(() => {
    setWorkingdaysData(workingdays);
  }, [workingdays]);

  const Handlebox = (e) => {
    if (e.target.checked) {
      let tempData = [
        ...checkData,
        {
          id: e.target.value,
        },
      ];
      setCheckData(tempData);
    } else {
      setCheckData(checkData.filter((data) => data.id !== e.target.value));
    }

   
  };

  const DeleteAll = () => {
    db.collection("workingdays")
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
    setCheckData([]);
  };

  const DeleteSelected = () => {
    checkData.map((check_data) => {
      db.collection("workingdays").doc(check_data.id).delete();
    });
    setCheckData([]);
  };

  const handleDelete = (data) => {
    db.collection("workingdays").doc(data.id).delete();
    setCheckData(checkData.filter((e) => e.id !== data.id));
    console.log("checkData", checkData);
  };

  const searchData = (name) => {
    setCheckData([]);
    name?
    setWorkingdaysData(
            workingdays.filter((data) => data.name.includes(name))
        ):setWorkingdaysData(
        workingdays
        )
  };
  const gotoUpdate = (data) => {
    history.push({
      pathname: "/workingdays/update",
      state: data,
    });
  };

  return (
    <div className="ViewContainer" >
    <div className="ViewContainer__nav" >
      <ScreenNav rightNavData={navData} />
    </div>
    <div className="container table-responsive-lg ">
      {loading ? (
        <Spinner Loader={DotLoader} size={30} />
      ) : (
        <React.Fragment>
          <div className="ViewContainer__top">
            <button
              onClick={(e) =>
                history.push({
                  pathname: "/workingdays/add",
                })
              }
              className="btn btn-dark btn_new"
            >
              Add new record
            </button>
            <Search searchData={searchData} />
          </div>
          {WorkingdaysData.length > 0 && (
             <table className="table table-dark table-hover ViewContainer__table">
             <thead>
               <tr>
                  <th></th>
                 
                 <th>Category</th>
                 <th>No of Days</th>
                 <th>Working Days</th>              
                 <th>From</th>
                 <th>To</th>
                 <th>No of Hours</th>
                 <th>Time Slot</th>
                 <th>Action</th>
                 <th>Action</th>
 
               </tr>
             </thead>
             <tbody>
                 
               {WorkingdaysData.map((data) => (
                 <tr key={data.id}>
                   <td>
                     <div className="form-check">
                     <input 
                     onChange={(e) => Handlebox(e, data)}
                     type="checkbox"
                     value={data.id}
                     className="form-check-input"/>
                    </div>
                     </td>
                    
                   <td> <span>{data.name}</span></td>
                   <td><span>{data.daysnum}</span> </td>
                   <td> <span>{data.days}</span></td>
                   <td><span>{data.fromtime}</span></td>
                   <td><span>{data.totime}</span></td>
                   <td> <span> {data.hours} </span></td>
                   <td><span> {data.timeslot}</span></td>                
                   <td>
                     <button onClick={(e) => gotoUpdate(data)}>Edit</button>
                   </td>
 
                   <td>
                     <button onClick={(e) => handleDelete(data)}>Delete</button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         )}

         <div className="ViewContainer__bottom">
           {WorkingdaysData.length > 0 && WorkingdaysData.length === workingdays.length && (
             <button onClick={DeleteAll} className="btn btn-danger">
               Delete All
             </button>
           )}

           {checkData.length > 0 && (
             <button onClick={DeleteSelected} className="btn btn-danger">
               Delete Selected
             </button>
           )}
         </div>
       </React.Fragment>
     )}
   </div>
 </div>
  );
};

export default Viewworkingdays;
