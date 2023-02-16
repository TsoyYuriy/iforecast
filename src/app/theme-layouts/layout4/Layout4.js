import FuseMessage from '@fuse/core/FuseMessage';
import FuseSuspense from '@fuse/core/FuseSuspense';
import AppContext from 'app/AppContext';
import { memo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { selectFuseCurrentLayoutConfig } from 'app/store/fuse/settingsSlice';
import CustomNavbar from './customComponents/customeNavbar/CustomNavbar';
import CustomToolbar from './customComponents/customToolbar/CustomToolbar';
import { styled } from '@mui/material';
import './Layout.css'

const Root = styled('div')(({ theme, config }) => ({
  ...(config.mode === 'boxed' && {
    clipPath: 'inset(0)',
    maxWidth: `${config.containerWidth}px`,
    margin: '0 auto',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  }),
  ...(config.mode === 'container' && {
    '& .container': {
      maxWidth: `${config.containerWidth}px`,
      width: '100%',
    },
  }),
}));


function Layout4(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  return (
      <Root id="fuse-layout" className="w-full flex" config={config}>
      <>
         <div className="flex flex-auto min-w-0 relative container__bg">
          {config.navbar.display && <CustomNavbar/>}

          <main id="fuse-main" className="main flex flex-col flex-auto relative z-10 grow pb-20">
            {config.toolbar.display && <CustomToolbar/>}

            <div className=" flex-auto min-h-0 relative z-10">
              <FuseSuspense>{useRoutes(routes)}</FuseSuspense>
              {props.children}
            </div>

          </main>

        </div>

        <FuseMessage />
      </>
       
      </Root>
  );
}

export default memo(Layout4);
