import React, {useState, useEffect} from 'react';
import "./App.css";
import { TextField } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  margin: '0 40px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '500px'
}));

function App() {

  const [cat, setCat] = useState('');
  const [img, setImg] = useState('');
  const [radio, setRadio] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  const handleChange = e => {
    const target = e.target;
    if (target.checked) {
      setRadio(target.value);
    }
 };
  
  useEffect(() => { 

    const imageUrl =  process.env.REACT_APP_CAT_KEY + cat;
    const waitTime = 1000;

    const fetchImage = async () => {
      const res = await fetch(imageUrl);
        if (res.status < 200 || res.status >= 300) {
            setErrorStatus(res.status)
            } 
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
        setLoading(false);
      }

    if(cat !== '') {
      setLoading(true);
      setImg(null);
      setErrorStatus(null);
    }
   
    const catTimer = setTimeout(() => fetchImage(), waitTime);
    return () => { clearInterval(catTimer);      
    } 
  },[cat, radio])
  
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
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  >
                  <FormControlLabel 
                    type="radio" 
                    value="red" 
                    control={<Radio />} 
                    checked={radio === "red"} 
                    label="Red"  
                    onChange={handleChange} 
                    />
                  <FormControlLabel 
                    type="radio" 
                    value="green" 
                    control={<Radio />} 
                    checked={radio === "green"} 
                    label="Green"  
                  onChange={handleChange} 
                  />
                  <FormControlLabel 
                    type="radio" 
                    value="blue" 
                    control={<Radio />} 
                    checked={radio === "blue"} 
                    label="Blue"  
                    onChange={handleChange} 
                  />
                </RadioGroup>
              </FormControl>
                {
                  !cat && <h1 style={{marginTop: '2em'}}>Use form to generate cat</h1>
                }
            </Item>
        </Grid>
                { cat && 
                  <Grid item xs={6}>
                    <Item>
                      {
                        loading && <h1>loading...</h1>
                      }
                      {
                        errorStatus && <h1>Cat could not be generated</h1>
                      }
                      <img src={img} alt="icons" className='margin: auto' />
                    </Item>
                  </Grid>
                }
          </Grid>
    </Box>
  );
}

export default App;
