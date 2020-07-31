import React,{useState,useEffect} from 'react';
import './Yearsemister.css';
import {db} from '../../firebase';
import firebase from 'firebase';

const Yearsemister = () => {

    const [year,setYear]=useState("");

    const submitHandler=(e)=>{
        e.preventDefault();
        db.collection('students').add({
            year_semister:year,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setYear("");
    }

    const clearInput=()=>{
        setYear("");
    }
 


    return (
        <div className="yearSemister__container">
            <div className="yearSemister">
                <h2>Add year & Semister</h2>
                <form id="frm" onSubmit={e=>submitHandler(e)}>
                    <div className="yearSemister_inputs">
                        <label htmlFor="year_semister">year & semister</label>
                        <input value={year} onChange={(e)=>setYear(e.target.value)}
                        placeholder="eg:S1.Y3" id="year_semister" type="text" className="form-control" required/>
                    </div>
                    <div className="yearSemister_buttons">
                        <button type="submit" class="btn" disabled={!year}>Add</button>
                        <button type="button" class="btn">View</button>
                        <button type="button" onClick={clearInput} class="btn">Clear</button>
                    </div>
                
                </form>
            </div>
        </div>
      
    );
};

export default Yearsemister;