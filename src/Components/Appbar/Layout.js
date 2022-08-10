import * as React from 'react';
import {Box, useMediaQuery, useTheme} from '@mui/material';

import {styled,} from '@mui/material/styles';



const BoxScroll = styled(Box)(({ theme }) => ({


  scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
            width:'0px',
          }



}));


const layoutStyle = {
desktop:{
  minHeight:'600px',
  display: 'grid', 
  gridTemplateColumns: '1fr 1fr 1fr', 
  gridTemplateRows: '1fr 1fr 1fr', 
  gap: '3px 3px', 
  gridTemplateAreas: 
    `"box1 box1 box2"
     "box4 box3 box3"` ,
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
    minHeight: '200px',
    display: 'flex',
    justifyContent:'center',
    }
    if(index === 1) return {...obj,justifyContent:'flex-start',pl:4.5};
    if(index === 2) return {...obj,justifyContent:'flex-start',overflow: 'auto',height:'400px',flexDirection:'column'};
    return obj
  },
 mobile: function(index) {
    return {
    order:index,
    backgroundColor:'primary.dark',
    borderRadius:1.5,
    mb:'8px',
    flexGrow:1,
    display: 'flex',
    justifyContent:'center',
    }
  }   
 }
}


export default function Layout(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const device = matches ? 'desktop' : 'mobile'; 
    const [nothing,calendar=null,list,words,phrase] = [null,...props.children];

  return (
    
          

              <BoxScroll sx={layoutStyle[device]} >
                <Box sx={layoutStyle.item[device](1)}>
                    {calendar}
                </Box>
                <Box sx={layoutStyle.item[device](3)}>
                    {words}
                </Box>
                <Box sx={layoutStyle.item[device](2)}>
                    {list}
                </Box>
                <Box sx={layoutStyle.item[device](4)}>
                    {phrase}
                </Box>
              </BoxScroll>

            
   
  );
}
