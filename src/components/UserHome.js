import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';

const UserHome = ({ userHomeDisplay, handleClickUserHomeButtons, handleChangeFileInput, handleUpload, uploadPercent, handleChangeUploadTitle, handleChangeUploadTags }) => {

  let navigate = useNavigate();


  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if(authToken) {
      navigate('/UserHome');
    }

    if(!authToken){
      navigate('/login');
    }

  }, []);

  return (
    <div className='user-home-main-container'>
      <div className='user-home-top-interact-bar'>
        <Button variant='contained' onClick={handleClickUserHomeButtons} id='Upload'>Upload</Button>
        <Button variant='contained' onClick={handleClickUserHomeButtons} id='Epic Clip'>Epic Clip</Button>
        <Button variant='contained' onClick={handleClickUserHomeButtons} id='Profile'>Profile</Button>
      </div>
      <div className='user-home-content'>
        {
          userHomeDisplay === 'Profile' &&
          <div>profile stuff will go here</div>
        }
        {
          userHomeDisplay === 'Upload' &&
          <div className='user-home-upload-form'>
            <div className='user-home-upload-form-input'>
              <Input type='file' accept='video/*' onChange={handleChangeFileInput} />
              <TextField type='text' variant='outlined' color='warning' label='Clip Title' onChange={handleChangeUploadTitle} />
              <TextField type='text' variant='outlined' color='warning' label='tags: single tags separated with commas/no space (potg,dva,teamwipe)' onChange={handleChangeUploadTags} />
            </div>
            <Button variant='contained' onClick={handleUpload}>upload to firebase</Button>
            <LinearProgress variant="determinate" value={uploadPercent} />
          </div>
        }
        {
          userHomeDisplay === 'Epic Clip' &&
          <div>Work in progress</div>
        }
      </div>
    </div>
  )
}

export default UserHome;
