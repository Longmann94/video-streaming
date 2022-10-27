import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function BasicTextField({ title, setPassword, setEmail, setDisplayName, handleAction }) {

  return (
    <div className='login-form'>
      <div className="heading-container">
        <h3>
          {title} Form
        </h3>
      </div>

      <Box
        component='form'
        sx={{
          '& > :not(style)': {m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <TextField id='email' label='Enter your Email' color='warning' variant='outlined' onChange={(e) => setEmail(e.target.value)} sx={{margin: '0.5rem'}} />
          <TextField id='passowrd' type='password' label='Enter your Password' color='warning' variant='outlined' onChange={(e) => setPassword(e.target.value)} sx={{margin: '0.5rem'}} />
          {title == 'Register' &&
            <TextField id='displayName' label='Enter your display name' color='warning' variant='outlined' onChange={(e) => setDisplayName(e.target.value)} sx={{margin: '0.5rem'}} />
          }
        </div>
      </Box>
      <Button onClick={handleAction} sx={{color: '#FFFFFF', backgroundColor: '#f99e1a'}} >{title}</Button>
    </div>
        );
}
