import { memo } from 'react';
import CustomNavbarContent from "app/theme-layouts/layout4/customComponents/customeNavbar/CustomNavbarContent";
import './CustomNavbar.css';
import Navigation from 'app/theme-layouts/shared-components/Navigation';

function CustomNavbar(props) {

  return (
    // <div>
    //   СВОЙ НАВБАР
    //   <br/>
    //   {/* <CustomNavbarContent /> */}
    // </div>

    <div className='customNavbar'>
      <div className="logoWrap">
        <img src={'assets/customImages/logo.svg'} alt="logo" className="logo hidden md:block" />
      </div>

      <Navigation layout="vertical" className='nav' />

    </div>
  );
}

export default memo(CustomNavbar);
