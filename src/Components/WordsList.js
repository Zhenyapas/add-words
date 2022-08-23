import React from 'react';
import Word from './Word';
import List from '@mui/material/List';
import { Box,} from '@mui/material';
import AddNewWord from './Buttons/AddNewWordButton';


const listStyle = {
  width: '100%',
   maxWidth: 360,
  bgcolor: 'background.paper',
}
const func = (day) => { 
  let newDay= new Date(day);
   return (newDay.getDate() + ' ' + newDay.getMonth() + ' ' + newDay.getFullYear())};

const wordsByDay = (day,words) =>  words.filter((elem) => { 
  return (func(elem.date) === func(day))
});

export default function WordsList(props) {

  let words = wordsByDay(props.date,props.words);
  console.log('Wordlist render');
  const select = (elemDate,propsDate) => {

    elemDate = new Date(elemDate);
    propsDate = new Date(propsDate);
    elemDate = elemDate[Symbol.toPrimitive]('string');
    propsDate = propsDate[Symbol.toPrimitive]('string');

    return elemDate === propsDate;
  }
  
  const dateParse = (date) => {
    const date1 = new Date(date);
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] ;
    const months = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
    return  'on ' + days[date1.getDay()] + ', in ' + months[date1.getMonth()] + ' ' + date1.getDate()  ;
  }
  const yourDay=dateParse(props.date);

    
  return (
    <>
    <Box sx={{ width: '100%',mt:2,pl:1.5, maxWidth: 360, bgcolor: 'background.paper',}}>{(words.length !== 0) ? 'Words you added:': `Sorry, you didn't add words ${yourDay} `}</Box>
    {(words.length != false) && 
    
    <List sx={listStyle} aria-label="word">

    {words.map((elem,i) => <Word date={elem.date} key={'list' + i}
     selected={select(elem.date,props.selectedDay)} name={elem.name} changeSelect={props.changeSelect} />)}

    </List>
    
    }
    {(func(props.date) === func(new Date())) && <AddNewWord sx={{mt:'20px'}} addNewWord={props.addNewWord} {...props}/>}
    </>
  );
}
