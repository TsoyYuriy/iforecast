import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import { useEffect } from 'react';
import jwtService from '../../auth/services/jwtService';
import './SigInPage.css';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string(),
  password: yup.string()
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

function SignInPage() {
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue('email', '', { shouldDirty: true, shouldValidate: true });
    setValue('password', '', { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  function onSubmit({ email, password }) {
    jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
  }

  return (
    <>
      <div className="signInPage">
        <div className='signInPage__inner'>

          <img className="signInPage__logo" src="assets/customImages/logo-signInPage.png" alt="logo" />

          <div className="form-wrap">
            <form
              name="loginForm"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-inner">

              <Typography sx={{
                fontWeight: '600',
                fontSize: '30px',
                lineHeight: '38px',
              }}>
                Войти
              </Typography>

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: '1px solid #D7D7D7',
                          borderRadius: '100px',
                        },
                      },
                    }}
                    className="mb-24"
                    label="Email"
                    autoFocus
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: '1px solid #D7D7D7',
                          borderRadius: '100px',
                        },
                      },
                    }}
                    className="mb-24"
                    label="Пароль"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Button
                variant="contained"
                color="secondary"
                sx={{
                  background: '#E88532',
                  color: 'white',
                  padding: '15px 0'
                }}
                className=" w-full mt-16"
                aria-label="Sign in"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Войти
              </Button>

              </div>
          
            </form>
          </div>

          <div className="support">
            <Typography
              className='support__title--mobile'
              sx={{
                fontWeight: '500',
                fontSize: '20px',
                color: 'white',
                opacity: '0.5',
              }}
            >При поддержки:</Typography>

            <img className='support__img' src="assets/customImages/qaz_invations.png" alt="logo" />
          </div>
          
          <Typography sx={{
            marginTop: 'auto',
            marginBottom: '10px',
            color: 'white',
            opacity: '0.5',
            fontSize: '16px',
            lineHeight: '26px'
          }}>© 2022 iForecast. Все права защищены</Typography>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
