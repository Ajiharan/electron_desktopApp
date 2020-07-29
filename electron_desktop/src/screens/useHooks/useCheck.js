import {useState,useCallback} from 'react';

const useCheck=(initialValue,value)=>{

    const[open,setOpen]=useState(initialValue);

    const handleClick=useCallback(()=>{
        setOpen(!open);
    },[open]);

    return{open,setOpen,handleClick}

};

export default useCheck;