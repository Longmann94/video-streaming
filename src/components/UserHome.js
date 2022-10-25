import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const UserHome = ({ handleLogout }) => {

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
    <div>
      this is where user can upload/delete manage their clips.
      <Button variant='contained' onClick={handleLogout}>Log out</Button>
    </div>
  )
}

export default UserHome;
