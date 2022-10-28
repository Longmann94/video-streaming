import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const UserHome = ({ userHomeDisplay, handleClickUserHomeButtons }) => {

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
          <div>profile stuff</div>
        }
        {
          userHomeDisplay === 'Upload' &&
          <div>upload stuff</div>
        }
        {
          userHomeDisplay === 'Epic Clip' &&
          <div>Epic stuff</div>
        }
      </div>
    </div>
  )
}

export default UserHome;
