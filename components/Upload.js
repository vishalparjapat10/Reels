import React from 'react';
import { Button } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';

function Upload() {
  return (
    <div className='upload-btn'>
        <Button color="secondary" variant="outlined" component="label" size="large" startIcon={<MovieIcon/>}>
            Upload Video
            <input hidden accept="*" multiple type="file" />
        </Button>
        <LinearProgress variant="determinate" value={"60"} style={{marginTop:"0.5rem"}} color='secondary'/>
    </div>
  )
}

export default Upload