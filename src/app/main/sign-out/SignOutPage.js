import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import JwtService from '../../auth/services/jwtService';
import './SignOutPage.css'

function SignOutPage() {
  useEffect(() => {
    setTimeout(() => {
      JwtService.logout();
    }, 1000);
  }, []);

  return (
    <div>
      <div className="signOutPage">
        <img src="assets/customImages/logo.svg" alt="logo" />

        <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
          Вы вышли из системы!
        </Typography>
      </div>
    </div>
  );
}

export default SignOutPage;
