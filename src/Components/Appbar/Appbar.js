import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {Box, Button,IconButton,} from '@mui/material';
import ComboBox from './ComboBox';


const style = {
  marginTop:'20px',
  mb:'10px',
  display:'flex',
  alignItems:'center',
  justifyContent:'space-around'
 }

export default function SearchAppBar(props) {

  return (
    <>
            <Box sx={style} >
              <IconButton
                size="large"
                
                color="inherit"
                aria-label="menu"
                sx={{   }}
              >
                <MenuIcon />

              </IconButton>
              <ComboBox {...props} addDate={props.addDate}/>
              <Button color="inherit"  sx={{mt:'4px'}}>Login</Button>
        
            </Box>
    </>
  );
}

