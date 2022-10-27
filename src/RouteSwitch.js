//import from react-router-dom
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

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
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, doc, query, where, getDoc, getDocs, Timestamp, setDoc } from 'firebase/firestore';

//import from toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import from materia UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';


const RouteSwitch = () => {

  const year = new Date().getFullYear();
  const navigate = useNavigate();

  //all use states goes here
  const [ search, setSearch ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ clipsArr, setClipsArr ] = useState([]);
  const [ currentClip, setCurrentClip ] = useState(''); //track what clip user is watching
  const [ recommendedTags, setRecommendedTags ] = useState([]);
  const [ uid, setUid ] = useState('');
  const [ displayName, setDisplayName ] = useState('');
  const [ userInfo, setUserInfo ] = useState({});
  const [ userComment, setUserComment ] = useState('');

//global varibles
const auth = getAuth();
const user = auth.currentUser;

//check user uid and find their display name
async function matchCurrentUser(uid) {
 console.log('reading db for uid match');
  try{
    let docRef = doc(db, 'users', uid);
    let docSnap = await getDoc(docRef);
     setDisplayName(docSnap.data().displayName);
     setUserInfo(docSnap.data());
  }
  catch(e) {
    console.log(e);
  }
}

//check for uid with async function
async function checkForUid() {

  try{
    const auth = await getAuth();
    const user = await auth.currentUser;

    //check if user is logged in
    onAuthStateChanged(auth, (user) => {
      if(user) {
        const uid = user.uid;
        matchCurrentUser(uid);
        setUid(uid);
      } else {
        console.log('user is not logged in');
        setUid('');
      }
    });
  }
  catch(e){
    toast.error('something went wrong during authentication try logging in again');
  }
}

//handle login/register
const handleAction = (id) => {


   //check if display name is already registered
   async function checkDisplayName() {

     try{
       let q = query(collection(db, 'users'), where('displayName', '==', displayName));
       let matching = await getDocs(q);
       if(matching.empty){
         return false;
       }else{
         toast.error('your display name is taken try another one!');
         return true;
       }
     }catch(e) {
       toast.error('oops! something went wrong, please try again later :D');
       console.log(e);
     }
   }

   //create user in user db
   async function createUser(uid, displayName) {

     const docRef = await setDoc(doc(db, 'users', uid), {
       displayName: displayName,
       profileImgUrl: 'url',
       search: ['search history'],
       userClips: ['array of user clips']
     });

   }

   if(id === 2){
  //if user display name isn't in db, create account with email and password

   checkDisplayName()
   .then((response) => {
     if(response === false){
       createUserWithEmailAndPassword(auth, email, password)
       .then((response) => {
         navigate('/UserHome');
         sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
       })
    .then(()=> {
      createUser(auth.currentUser.uid, displayName);
    })
       .catch((error) => {
         if(error.code === 'auth/email-already-in-use'){
           toast.error('This email is already in use');
         }
       });
     }
   })
   .catch((e) =>{
     console.log('something went wrong')
   });
 }

   if(id === 1) {
     signInWithEmailAndPassword(auth, email, password)
     .then((response) => {
       navigate('/UserHome');
       sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
     })
     .then(() => {
       matchCurrentUser(auth.currentUser.uid);
     })
     .catch((error) => {
       if(error.code === 'auth/wrong-password'){
         toast.error('Please check the Password');
       }
       if(error.code === 'auth/invalid-email'){
         toast.error('Please check the email');
       }
       toast.error('Please check your email or password');
     });
   }
}

//handle log out, remove session token, sign user out, setUid to empty, and navigate to home page
const handleLogout = () => {
  sessionStorage.removeItem('Auth Token');
  auth.signOut();
  setUid('');
  navigate('/');
  toast.success('you have logged out');
}

//navigate to login page
const handleClickLogin = () => {
  navigate('/login');
}

//navigate to register page
const handleClickRegister = () => {
  navigate('/register');
}

//navigate to register page
const handleClickUserHome = () => {
  navigate('/UserHome');
}

//handlechange in search box
const handleChange = (e) => {
  setSearch(e.target.value);
}

//handleChange in comment box
const handleChangeComment = (e) => {
  setUserComment(e.target.value);
}
const location = useLocation();
//handle submit user comment to video db document
const handleSubmitUserComment = () => {
  console.log(location);

   if(!user){
     toast.error('please login to make a comment');
     return;
   }

   if(userComment.length === 0){
     toast.error('please write what you want to comment');
     return;
   }

   const postComment = async () => {

   }


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

//handleClick to return to homepage and reset search
const handleClickHome = () => {
  navigate('/');
  readDb();
}

//db related functions
async function readDb() {
  console.log('reading db');

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

//initial loading and everytime component is mounted
useEffect(() => {

  readDb();
  checkForUid();

}, []);

  return (
    <div className="body-container">
      <ToastContainer />
      <div className="top-container">
        <div>
          <a onClick={handleClickHome}>
            <img height="150" width="150" src="https://firebasestorage.googleapis.com/v0/b/clip-sharing-749b3.appspot.com/o/Overwatch2_Primary_DKBKGD.png?alt=media&token=30149a8d-5928-4278-a906-e783bbf6ce36" alt="overwatch logo"/>
          </a>
        </div>
        <div className='search-container'>
          <TextField id='searchInput' label='Search OWPOTG...' variant='outlined' color='warning' onChange={handleChange} sx={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF'}}/>
          <Button variant='contained' size='large' sx={{color: '#FFFFFF', backgroundColor: '#f99e1a'}} onClick={handleClickSearch}>Search!</Button>
        </div>
        <div className='top-user-panel'>
          <div>
            Hello, <b>{uid ? 'welcome back! ' + displayName : 'Stranger, consider registering :)'}</b>
          </div>
          {uid
            ?<Button variant='contained' onClick={handleLogout} endIcon={<LogoutOutlinedIcon />} sx={{color: '#FFFFFF', backgroundColor: '#f99e1a'}} >Log Out</Button>
            :<Button variant='contained' onClick={handleClickLogin} endIcon={<LoginIcon />} sx={{color: '#FFFFFF', backgroundColor: '#f99e1a'}} >Login</Button>
          }
          {!uid
            ?<Button variant='contained' onClick={handleClickRegister} sx={{color: '#FFFFFF', backgroundColor: '#f99e1a'}} >Register</Button>
            :<Button variant='contained' onClick={handleClickUserHome} endIcon={<HomeIcon />} sx={{color: '#FFFFFF', backgroundColor: '#f99e1a'}} >User Home</Button>
          }

        </div>
      </div>
      <Routes>
        <Route path='/' element={<App clipsArr={clipsArr} />} />
        <Route path='/login' element={<Form title='Login' setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)} />} />
        <Route path='/register' element={<Form title='Register' setEmail={setEmail} setPassword={setPassword} setDisplayName={setDisplayName} handleAction={() => handleAction(2)} />} />
        <Route path='/UserHome' element={<UserHome handleLogout={handleLogout}/>} />

        {clipsArr.map((clip) => {

          return <Route key='clip.id' path={clip.id} element={<POTGView clip={clip} handleChangeComment={handleChangeComment} handleSubmitUserComment={handleSubmitUserComment} />} />

        })}

      </Routes>
      <Footer year={year} />
    </div>
  );

}

export default RouteSwitch;
