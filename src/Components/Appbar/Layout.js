import React, { Children } from "react";
import {Box, useMediaQuery, useTheme} from '@mui/material';

import {styled,} from '@mui/material/styles';



const BoxCustom = styled(Box)(({ theme }) => ({


  scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
            width:'0px',
          }



}));


const layoutStyle = {
desktop:{
  display: 'grid', 
  gridTemplateColumns: '1fr 1fr 1fr', 
  gap: '3px 3px', 
  gridTemplateAreas: 
    `"box1 box1 box2"` ,
 },
mobile : {
    minHeight:'100vh',
    display: 'flex', 
    flexDirection:'column',
    alignItems: 'stretch'
    
 },
item: {
 desktop:function(index) {
   let obj = {
    gridArea:'box'+ index,
    display: 'flex',
    justifyContent:'flex-start',
    }
    if(index === 1) return {...obj,pl:4.5};
    if(index === 2) return {...obj,overflow:'auto',flexDirection:'column'};
    return obj
  },
 mobile: function(index) {
    return {
    order:index,
    borderRadius:1.5,
    mb:'8px',
    flexGrow:1,
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center',
    }
  }   
 }
}


export default function Layout(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const {children} = props;

    const device = matches ? 'desktop' : 'mobile';
    const [calendar=children,list,words,phrase] = (Array.isArray(children)) ? [...children] : [];
    

  return (
    
              <BoxCustom sx={layoutStyle[device]} >
                <Box sx={layoutStyle.item[device](1)}>
                    {calendar}
                </Box>
                <Box sx={layoutStyle.item[device](2)}>
                    {list} 
                </Box>
              </BoxCustom>

  );
}
