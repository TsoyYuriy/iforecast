import './Dashboard.css';
import LeftPanel from './components/LeftPanel/LeftPanel';
import RightTopPanel from './components/RightTopPanel/RightTopPanel';
import RightBottomPanel from './components/RightBottomPanel/RightBottomPanel';

function DashboardClean() {

  return (
    <div className="dashboard-wrap">
       <div className='dashboard'>
        <LeftPanel/>

        <div className="dashboard__right">
          <RightTopPanel/>
          <RightBottomPanel/>
        </div>
      </div>
    </div>
     
     
  );
}

export default DashboardClean;
