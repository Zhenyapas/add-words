
import React, {useEffect, useState } from 'react';
import { Container, CssBaseline,} from '@mui/material';
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
  {name:'Goverment', translation:['правительство'], date:['January 25, 2022 23:15:41']},
  {name:'It is a real treat', translation:['это большое удовольствие'], date:['January 25, 2022 23:15:30',]},
  {name:'Excited', translation:['взволнован'], date: ['January 25, 2022 22:15:30']},
  {name:'Cheer up', translation:['выше нос!'], date: ['January 25, 2022 22:05:20',]},
],
selectedDay: false,
date: new Date(),
loading:true,
}
const defaultState = {
  words : [],
  selectedDay: false,
  date: new Date(),
  loading:true,
}

function App() {

  const [state,setState] = useState(defaultState);

  const delay = (ms) => {
    return new Promise((r)=> {setTimeout(r,ms)})
  }

  async function getStore() {
    await delay(10000);
     setState({...store,loading:false});
  }

  
  
 useEffect(() => {
   console.log('RENDER APP');
   getStore();
  },[])
 


  const addDate = (date,selectedDay) => {
    setState({...state,date,selectedDay})
  }

  const changeSelect = (selectedDay) => {
    setState({...state,selectedDay})
  }

  const addNewWord = ({name,translation, date}) => {

  


   
    
    let index = state.words.findIndex((e) => e.name.toLowerCase() === name.toLowerCase());
    if(index !== -1){
      
      console.log('Index Render');
      const newArr = [...state.words];
      newArr.splice(index,1,{name,translation:[...newArr[index].translation,translation],date:[...newArr[index].date,date]});
      console.log(newArr);

      return setState({...state,words:newArr});

    }

    setState({...state,words:[...state.words,{name,translation:[translation],date:[date]}]})
    
    
  }

  
  

  return (
    
      

        <ThemeProvider theme={darkTheme}>

          <CssBaseline />
         
            <Container maxWidth={'md'}>

              <SearchAppBar  addDate={addDate} {...state} />
              <Layout  >

                <StaticDatePickerLandscape {...state} addDate={addDate}  />
                <WordsList {...state} changeSelect={changeSelect} addNewWord={addNewWord}/>
                
               

              </Layout>

            </Container>
          
        </ThemeProvider>

    
  );
}



export default App;
