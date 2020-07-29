import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import {Link} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import usecheck from '../useHooks/useCheck';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor:'rgb(36, 35, 35)',
    color:'white',
    fontFamily:"Iceland cursive"
  },
  nested: {
    paddingLeft: theme.spacing(8),
    
  },
  sub_nested:{
    paddingLeft: theme.spacing(11),
  }
}));

const  HomeNestedList=()=> {
  const classes = useStyles();
  const subjectData=usecheck(false);
  const lectureData=usecheck(false);
  const studentData=usecheck(false);
  const sub_studentData=usecheck(false);
 
  return (
    // nav list
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader style={{ color: "white"}} component="div" id="nested-list-subheader">
          Management Navigation List
        </ListSubheader>
      }
      className={classes.root}
    >
      {/* student list */}
      <ListItem button  onClick={studentData.handleClick}>
        <ListItemIcon>
          <PeopleOutlineIcon style={{ color: "white"}} />
        </ListItemIcon >
        <ListItemText primary="Students" />
        {studentData.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {/* student >year&semister  sub list */}
      <Collapse in={studentData.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={sub_studentData.handleClick}>    
            <ListItemText primary="year & semister" />
            {sub_studentData.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {/* student > year & semister sub list */}
          <Collapse in={sub_studentData.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
             {/* student > year & semister > Add sub list */}
             <Link to="/student/year_semister/add">
              <ListItem button className={classes.sub_nested}>
                <ListItemText primary="Add" />
              </ListItem>
             </Link>       
             {/* student > year & semister >view sub list */}
            <ListItem button className={classes.sub_nested}>
            
              <ListItemText primary="view" />
            </ListItem>

          </List>
        </Collapse>
          {/* student > group number list */}
          <ListItem button className={classes.nested}>
           
            <ListItemText primary="Group Number" />
          </ListItem>


        </List>
      </Collapse>

      <ListItem button onClick={lectureData.handleClick}>
        <ListItemIcon>
          <SupervisedUserCircleIcon style={{ color: "white"}} />
        </ListItemIcon>
        <ListItemText primary="Lectures" />
        {lectureData.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={lectureData.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
           
            <ListItemText primary="Add" />
          </ListItem>
          <ListItem button className={classes.nested}>
           
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      </Collapse>


      <ListItem button onClick={subjectData.handleClick}>
        <ListItemIcon>
          <ImportContactsIcon style={{ color: "white"}}/>
        </ListItemIcon>
        <ListItemText primary="Subjects" />
        {subjectData.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={subjectData.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
           
            <ListItemText primary="Add" />
          </ListItem>
          <ListItem button className={classes.nested}>
           
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

export default HomeNestedList;
