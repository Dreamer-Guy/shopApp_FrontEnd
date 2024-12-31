import { Outlet } from 'react-router-dom';

const UserLayout = () => {
    return (
        <div>
            {/* User layout content */}
            <Outlet /> {/* Render child routes */}
        </div>
    );
}; 

export default UserLayout;