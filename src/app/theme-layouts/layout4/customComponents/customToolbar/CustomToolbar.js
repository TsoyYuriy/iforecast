import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import { selectFuseNavbar } from 'app/store/fuse/navbarSlice';
import './CustomToolbar.css'
import LanguageSwitcher from 'app/theme-layouts/shared-components/LanguageSwitcher';
import UserMenu from 'app/theme-layouts/shared-components/UserMenu';

function CustomToolbar(props) {

  return (
    <div className="toolbar">
      <LanguageSwitcher/>
      <UserMenu/>
    </div>
  );
}

export default memo(CustomToolbar);
