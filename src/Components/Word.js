import React, {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HistoryIcon from '@mui/icons-material/History';


export default function Word({name,date,selected,changeSelect}) {
    date = new Date(date);
    const time = date.getHours() + ':' + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()) ;
    const word = name;
    const setSelect = () => {
      changeSelect(date);
    }
  return (

    <>
      <ListItem disablePadding >
        <ListItemButton sx={{borderRadius:'4px', pr:1.5,pl:1.5}} selected={selected} onClick={setSelect}  >
          <ListItemText primary={word} sx={{color:'primary.main'}} />
         
          <ListItemIcon sx={{display:'flex'}}>
            <ListItemText primary={time} />
            <HistoryIcon sx={{ml:1, mt:'2px',}}/>
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </>

  );
}
