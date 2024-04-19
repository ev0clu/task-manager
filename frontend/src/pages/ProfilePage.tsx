import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useQueryAll from '../hooks/useQueryAll';
import useMutationUserUpdate from '../hooks/useMutationUserUpdate';
import { TUser } from '../types/user.type';

const formSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .max(10)
      .trim(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email')
      .trim(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(3, 'Password must have min 3 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Password confirmation is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match'
  });

type formType = z.infer<typeof formSchema>;

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const userQuery = useQueryAll<TUser>(
    'user',
    `${import.meta.env.VITE_API_USER}`
  );

  const userMutation = useMutationUserUpdate();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    values: {
      username: `${userQuery.data?.username}`,
      email: `${userQuery.data?.email}`,
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: formType) => {
    userMutation.mutate(data);
  };

  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: '1rem' }}>
      <Box sx={{ width: '30ch', marginX: 'auto' }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600
          }}
        >
          Profile
        </Typography>
        <Stack
          direction={'row'}
          gap={1}
          sx={{ marginBottom: '1rem' }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 400
            }}
          >
            Role:
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 400,
              opacity: 0.8
            }}
          >
            {userQuery.data?.role}
          </Typography>
        </Stack>
      </Box>
      {userQuery.isPending ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={'column'}
            spacing={1}
            alignItems={'center'}
          >
            <FormControl
              sx={{ m: 1, width: '30ch' }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-username">
                Username
              </InputLabel>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    label="Username"
                    id="outlined-adornment-username"
                    type="text"
                    {...field}
                  />
                )}
              />
              <FormHelperText
                id="username-error-text"
                error={errors.username?.message !== '' ? true : false}
              >
                {errors.username?.message}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={{ m: 1, width: '30ch' }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-email">
                Email
              </InputLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    label="Email"
                    id="outlined-adornment-email"
                    type="email"
                    {...field}
                  />
                )}
              />
              <FormHelperText
                id="email-error-text"
                error={errors.email?.message !== '' ? true : false}
              >
                {errors.email?.message}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={{ m: 1, width: '30ch' }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    label="Password"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...field}
                  />
                )}
              />
              <FormHelperText
                id="password-error-text"
                error={errors.password?.message !== '' ? true : false}
              >
                {errors.password?.message}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={{ m: 1, width: '30ch' }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-confirm-password">
                Confirm password
              </InputLabel>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    label="Confirm password"
                    id="outlined-adornment-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...field}
                  />
                )}
              />
              <FormHelperText
                id="confirm-password-error-text"
                error={
                  errors.confirmPassword?.message !== ''
                    ? true
                    : false
                }
              >
                {errors.confirmPassword?.message}
              </FormHelperText>
            </FormControl>
            <Box sx={{ textAlign: 'center' }}>
              <LoadingButton
                type="submit"
                size="small"
                endIcon={<SendIcon />}
                loading={userMutation.isPending}
                loadingPosition="end"
                variant="contained"
                sx={{ width: '8rem' }}
              >
                <span>Update</span>
              </LoadingButton>
            </Box>
            {userMutation.error && (
              <FormHelperText error={userMutation.isError}>
                {userMutation.error.message}
              </FormHelperText>
            )}
          </Stack>
        </form>
      )}
    </Container>
  );
};

export default ProfilePage;
