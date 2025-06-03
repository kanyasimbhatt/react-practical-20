import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
  IconButton,
  LinearProgress,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { type User } from '../../../Types/UserType';
import { setData } from '../../../Utils/store';
import { useUsers } from '../userProvider';
import useCheckAuth from '../../../hooks/useCheckAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchUserData } from '../../../Services/User/userService';

type UserFormField = {
  email: string;
  password: string;
};
 
export const Login = () => {
  const { isLoading } = useCheckAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { setUserId } = useUsers();
  const navigate = useNavigate();

  const {data} = useQuery({
    queryKey: ['users/fetchUsers'],
    queryFn: fetchUserData
  })

  const handleClickOnShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<UserFormField>();

  const slotPropsForPassword = {
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label={
              showPassword ? 'hide the password' : 'display the password'
            }
            onClick={handleClickOnShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      ),
    },
  };

  const onSubmit: SubmitHandler<UserFormField> = (formData) => {
    const userData = data.find(
      (user: User) =>
        user.email === formData.email && user.password === formData.password
    );
    if (!userData) {
      setError('root', {
        type: 'authentication',
        message: 'Invalid email or password',
      });
      return;
    }
    setUserId(userData.id);
    setData<string>('user-id', userData.id);
    navigate('/');
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={'column'}
            spacing={3}
            maxWidth={'600px'}
            margin={'auto'}
            marginTop={'80px'}
            padding={'80px'}
            boxShadow={'0px 0px 20px gray'}
            borderRadius={'7px'}
          >
            <Typography variant="h4" textAlign={'center'}>
              Login
            </Typography>

            <TextField
              {...register('email')}
              type="email"
              label="Email"
              variant="outlined"
              color="primary"
              size="medium"
              required
            ></TextField>

            <TextField
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              label="Password"
              slotProps={slotPropsForPassword}
              variant="outlined"
              color="primary"
              size="medium"
              helperText="Do not share your password with anyone"
              required
            ></TextField>
            <Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loading...' : 'Login'}
              </Button>
              {errors.root && (
                <Typography color="red">{errors.root.message}</Typography>
              )}
              <Typography variant="subtitle2" color="gray">
                A new User: <Link to="/signup">Sign Up</Link>
              </Typography>
            </Stack>
          </Stack>
        </form>
      )}
    </>
  );
};

export const Loading = () => {
  return <LinearProgress />;
};