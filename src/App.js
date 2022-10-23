import React, {useState, useEffect, useRef} from 'react';
import "./App.css";
import { TextField } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import useSound from 'use-sound';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


// import mySound from './assets/Sound.mp3'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  margin: '0 40px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '500px'
}));

const { CAT_KEY } = process.env;

function App() {

  const [cat, setCat] = useState('');
  const [img, setImg] = useState('');
  const [radio, setRadio] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(true);

  const imageUrl = process.env.REACT_APP_CAT_KEY + cat;
  const waitTime = 1000;

  console.log(process.env.REACT_APP_CAT_KEY);

  const fetchImage = async () => {
  
  const res = await fetch(imageUrl);
  console.log(res)
    if (!res.status >= 200 && !res.status <= 299) {
        const jsonResponse = await res.status;
        console.log(jsonResponse);
        console.log(res.status, res.statusText);
        setErrorStatus([res.status, res.statusText])
        } 
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
    setLoading(false);
  }

  const handleChange = e => {
    const target = e.target;
    if (target.checked) {
      setRadio(target.value);
    }
 };
  
  const notInitialRender = useRef(false);

  useEffect(() => { 
    if (notInitialRender.current) {

    
    if(cat !== '') {
      setLoading(true);
      setImg(null);
      setErrorStatus(null);
    }
    const catTimer = setTimeout(() => fetchImage(), waitTime);
    return () => { clearInterval(catTimer);
    } } 
    else if(notInitialRender.current) {
      notInitialRender.current = false
    }
    else {
      notInitialRender.current = true
    }
  },[cat, radio])

  // const [playSound] = useSound(mySound);

  // const catSound = () => {
  //   playSound()
  // }

  // useEffect(() => {
  //   catSound();
  // }, [])  
    
 
     
 
  return (
    <Box className='child'>
       <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            
        <FormControl noValidate autoComplete='off' className='margin: auto'>
        <TextField 
                placeholder='Add Cat Name'
                type="text" 
                id='cat' 
                name='cat'
                onChange={(e) => setCat(e.target.value)}
          />
      
           
 
        
      <FormLabel id="demo-radio-buttons-group-label">Choose color</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
       
      >
        <FormControlLabel type="radio" value="red" control={<Radio />} checked={radio === "red"} label="Red"  onChange={handleChange} />
        <FormControlLabel type="radio" value="green" control={<Radio />} checked={radio === "green"} label="Green"  onChange={handleChange} />
        <FormControlLabel type="radio" value="blue" control={<Radio />} checked={radio === "blue"} label="Blue"  onChange={handleChange} />
      </RadioGroup>
    </FormControl>
          </Item>
        </Grid>
        { cat && 
        <Grid item xs={6}>
          <Item><div>
             {
              loading && <h1>loading...</h1>
             }
             {
              errorStatus && <h1>Cat could not be generated</h1>
             }
              <img src={img} alt="icons" className='margin: auto' />
        </div></Item>
        </Grid>
        }
      </Grid>
        
          
       
        
       
    </Box>
  );
}

export default App;
