import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './Button';

export default function BasicTextField({ title, setPassword, setEmail, handleAction }) {
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
          <TextField id='email' label='Enter the Email' variant='outlined' onChange={(e) => setEmail(e.target.value)} sx={{margin: '0.5rem'}} />
          <TextField id='passowrd' label='Enter the Password' variant='outlined' onChange={(e) => setPassword(e.target.value)} sx={{margin: '0.5rem'}} />
        </div>
      </Box>

      <Button title={title} handleAction={handleAction} />
    </div>
        );
}
