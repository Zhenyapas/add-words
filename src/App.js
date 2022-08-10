
import React, { useEffect, useState } from 'react';
import { Container, CssBaseline,Box } from '@mui/material';
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import SearchAppBar from './Components/Appbar/Appbar';
import Layout from './Components/Appbar/Layout';
import StaticDatePickerLandscape from './Components/Calendar';
import WordsList from './Components/WordsList';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
            width:'10px',
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});

const store = { words : [
  {name:'Goverment', translation:'правительство', date:'January 25, 2022 23:15:41'},
  {name:'It is a real treat', translation:'это большое удовольствие', date:'January 25, 2022 23:15:30'},
  {name:'Excited', translation:'взволнован', date: 'January 25, 2022 22:15:30'},
  {name:'Cheer up', translation:'Выше нос!', date: 'March 25, 2022 12:15:30'},
],
selectedDay: false,
date: new Date(),
}

function App() {

  const [state,setState] = useState(store);

  

  const addDate = (date,selectedDay) => {
    setState({...state,date,selectedDay})
  }

  const changeSelect = (selectedDay) => {
    setState({...state,selectedDay})
  }

  
  

  return (
    
      

        <ThemeProvider theme={darkTheme}>

          <CssBaseline />
         
            <Container maxWidth={'md'}>

              <SearchAppBar words={state.words} addDate={addDate} />
              <Layout  >
                <StaticDatePickerLandscape {...state} addDate={addDate}  />
                <WordsList {...state} changeSelect={changeSelect}/>


              </Layout>

            </Container>
          
        </ThemeProvider>

    
  );
}



export default App;
