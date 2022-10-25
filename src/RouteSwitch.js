//import from react-router-dom
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from "react-router-dom";

//import from react
import { useState, useEffect } from 'react';

//import from componenets
import App from './App';
import Form from './components/common/Form';
import POTGView from './components/POTGView';
import UserHome from './components/UserHome';
import Footer from './components/Footer';

//import from firebase
import { app, db } from './firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, query, where, getDoc, getDocs, Timestamp } from 'firebase/firestore';

//import from toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import from materia UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const RouteSwitch = () => {

  const year = new Date().getFullYear();

  const navigate = useNavigate();

  const [ search, setSearch ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ clipsArr, setClipsArr ] = useState([]);

//handle login/register
const handleAction = (id) => {
   const authentication = getAuth();

   if(id === 2){
   createUserWithEmailAndPassword(authentication, email, password)
   .then((response) => {
     navigate('/UserHome');
     sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
   })
   .catch((error) => {
     if(error.code === 'auth/email-already-in-use'){
       toast.error('This email is already in use');
     }
   });
 }

   if(id === 1) {
     signInWithEmailAndPassword(authentication, email, password)
     .then((response) => {
       navigate('/UserHome');
       sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
     })
     .catch((error) => {
       if(error.code === 'auth/wrong-password'){
         toast.error('Please check the Password');
       }
       if(error.code === 'auth/invalid-email'){
         toast.error('Please check the email');
       }
     });
   }
}

//handle log out
const handleLogout = () => {
  sessionStorage.removeItem('Auth Token');
  navigate('/');
}

//navigate to login page
const handleClickLogin = () => {
  navigate('/Login');
}

//handlechange in search box
const handleChange = (e) => {
  setSearch(e.target.value);
}

//handle search button click
const handleClickSearch = async () => {

  //move user to App/main page
  navigate('/');

  //if search is empty just reload initial db snapshot
  if(search === ''){
    readDb();
    return;
  }

  try{
    let q = query(collection(db, 'ow-potg-db'), where('tags', 'array-contains', search));
    let qSnap = await getDocs(q);
    let tempArr = [];
    setClipsArr([]);
    //if nothing is found return a message
    if(qSnap.empty) toast.error('no results found try something else');
    qSnap.forEach((doc) => {
      tempArr.push(doc.data());
      setClipsArr([...tempArr]);
    });
  }catch(e) {
    toast.error('oops! something went wrong, please try again later :D');
  }
}

//db related functions
async function readDb() {

  try{
    const q = query(collection(db, 'ow-potg-db'));
    const qSnap = await getDocs(q);
    const tempArr = [];
    qSnap.forEach((doc) => {
      tempArr.push(doc.data());
      setClipsArr([...tempArr]);
    });
  }catch(e) {
    toast.error('oops! something went wrong, please try again later :D');
  }
}

//initial loading for clips info from firestore
useEffect(() => {

readDb();

}, []);

  return (
    <div className="body-container">
      <ToastContainer />
      <div className="top-container">
        <div>
          <Link to='/'>
            <img height="150" width="150" src="https://firebasestorage.googleapis.com/v0/b/clip-sharing-749b3.appspot.com/o/Overwatch2_Primary_DKBKGD.png?alt=media&token=30149a8d-5928-4278-a906-e783bbf6ce36" alt="overwatch logo"/>
          </Link>
        </div>
        <div className='search-container'>
          <TextField id='searchInput' label='Search POTG...' variant='outlined' color='warning' onChange={handleChange} sx={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF'}}/>
          <Button variant='contained' size='large' sx={{color: '#FFFFFF', backgroundColor: '#f99e1a'}} onClick={handleClickSearch}>Search!</Button>
        </div>
        <div className='top-user-panel'>
          <Button variant='contained' onClick={handleClickLogin}>Login</Button>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<App clipsArr={clipsArr} />} />
        <Route path='/login' element={<Form title='Login' setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)} />} />
        <Route path='/register' element={<Form title='Register' setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(2)} />} />
        <Route path='/UserHome' element={<UserHome handleLogout={handleLogout}/>} />

        {clipsArr.map((clip) => {

          return <Route key='clip.id' path={clip.id} element={<POTGView clip={clip} />} />

        })}

      </Routes>
      <Footer year={year} />
    </div>
  );

}

export default RouteSwitch;
