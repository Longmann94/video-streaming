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
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, doc, query, where, getDoc, getDocs, Timestamp, setDoc } from 'firebase/firestore';

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
  const [ currentClip, setCurrentClip ] = useState(''); //track what clip user is watching
  const [ recommendedTags, setRecommendedTags ] = useState([]);
  const [ uid, setUid ] = useState('');
  const [ displayName, setDisplayName ] = useState('');

//check if user is logged in
const auth = getAuth();
const user = auth.currentUser;

//handle login/register
const handleAction = (id) => {
   const authentication = getAuth();

   if(id === 2){
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
  //if user display name isn't in db, create account with email and password

   checkDisplayName()
   .then((response) => {
     if(response === false){
       createUserWithEmailAndPassword(authentication, email, password)
       .then((response) => {
         navigate('/UserHome');
         sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
       })
    .then(()=> {
      console.log(displayName, auth.currentUser.uid);
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

//handleClick to return to homepage and reset search
const handleClickHome = () => {
  navigate('/');
  readDb();
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

// const owdb = collection(db, 'ow-potg-db');
//
// setDoc(doc(owdb, '8DSb6rt3sHuJaYjVZcdR'), {
//   id: 'id3',
//   title: 'hanzo potg flanking ult :)',
//   thumbnailUrl: 'https://img.youtube.com/vi/vinSWocWveI/hqdefault.jpg',
//   url: 'https://www.youtube.com/embed/vinSWocWveI?autoplay=1&rel=0&mute=1',
//   epic: [ 'user1', 'user2', 'user3', 'user4', 'user5', 'user6' ],
//   tags: [ 'hanzo', 'ultimate', 'teamwipe', 'noob' ]
// });
//
// setDoc(doc(owdb, 'S1cGIZeDjqZTNOj4cytd'), {
//   id: 'id4',
//   title: 'just another hanzo potg',
//   thumbnailUrl: 'https://img.youtube.com/vi/q6HbK5Dhqxo/hqdefault.jpg',
//   url: 'https://www.youtube.com/embed/q6HbK5Dhqxo?autoplay=1&rel=0&mute=1',
//   epic: [ 'user1', 'user2', 'user3', 'user4' ],
//   tags: [ 'hanzo', 'ultimate', 'teamwipe', 'op', 'potg' ]
// });
//
// setDoc(doc(owdb, 'WTzKAz6WEmAMUneqvis3'), {
//   id: 'id5',
//   title: 'last hanzo potg I promise',
//   thumbnailUrl: 'https://img.youtube.com/vi/QpmsaI3bNIE/hqdefault.jpg',
//   url: 'https://www.youtube.com/embed/QpmsaI3bNIE?autoplay=1&rel=0&mute=1',
//   epic: [ 'user1', 'user2', 'user4', 'user5', 'user6', 'user10' ],
//   tags: [ 'hanzo', 'ultimate', 'teamwipe', 'noob', 'potg' ]
// });
//
// setDoc(doc(owdb, 'jd2V8wBFRLEZHEdNBGCd'), {
//   id: 'id6',
//   title: 'sym rat potg',
//   thumbnailUrl: 'https://img.youtube.com/vi/hfq5iikdCeg/hqdefault.jpg',
//   url: 'https://www.youtube.com/embed/hfq5iikdCeg?autoplay=1&rel=0&mute=1',
//   epic: [ 'user1', 'user5', 'user6', 'user42' ],
//   tags: [ 'symmetra', 'pro' ]
// });
//
// setDoc(doc(owdb, 'e50ycVx6wn8paRoNAbrN'), {
//   id: 'id7',
//   title: 'symmetra potg',
//   thumbnailUrl: 'https://img.youtube.com/vi/XqMyA-rJRTI/hqdefault.jpg',
//   url: 'https://www.youtube.com/embed/XqMyA-rJRTI?autoplay=1&rel=0&mute=1',
//   epic: [ ],
//   tags: [ 'symmetra' ]
// });

//initial loading for clips info from firestore
useEffect(() => {

readDb();

}, []);

//check for user login status
useEffect(() => {

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    setUid(uid);
    // ...
  } else {
    setUid('');
  };

});

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
          {uid
            ?<Button variant='contained' onClick={handleLogout}>Log Out</Button>
            :<Button variant='contained' onClick={handleClickLogin}>Login</Button>
          }
          {!uid &&
            <Link to='/register'><Button variant='contained'>Register</Button></Link>
          }

        </div>
      </div>
      <Routes>
        <Route path='/' element={<App clipsArr={clipsArr} />} />
        <Route path='/login' element={<Form title='Login' setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)} />} />
        <Route path='/register' element={<Form title='Register' setEmail={setEmail} setPassword={setPassword} setDisplayName={setDisplayName} handleAction={() => handleAction(2)} />} />
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
