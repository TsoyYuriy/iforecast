import Avatar from '@mui/material/Avatar';
import {useSelector} from 'react-redux';
import {selectUser} from 'app/store/userSlice';
function CustomNavbarContent(props) {
    const user = useSelector(selectUser);
    return (
        <div className="flex items-center justify-center mb-24">
            <Avatar
                sx={{
                    backgroundColor: 'background.paper',
                    color: 'text.secondary',
                }}
                className="avatar text-32 font-bold w-96 h-96"
                src={user.data.photoURL}
                alt={user.data.displayName}
            >
                {user.data.displayName.charAt(0)}
            </Avatar>
        </div>
    );
}

export default CustomNavbarContent;
