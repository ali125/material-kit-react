import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import { AuthContext } from '../../../context/AuthContext';
import AuthService from '../../../services/AuthService';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);

  const { setIsLoggedIn } = useContext(AuthContext);

  const handleClick = () => {
    setError(null);
    setLoading(true);
    console.log(email, password, remember);
    AuthService.login(email, password, remember).then((token) => {
      if (token) {
        setIsLoggedIn(true);
        navigate('/dashboard', { replace: true });
      }
    }).catch(e => {
      setError(e.toString());
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField name="email" onChange={(e) => setEmail(e.target.value)} label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" onChange={(e) => setRemember(e.target.checked)} />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth loading={loading} size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
