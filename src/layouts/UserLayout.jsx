import { Outlet } from 'react-router-dom';
import ShoppingHeader from '@/components/shop/header';
import ShoppingFooter from '@/components/shop/footer';

const UserLayout = () => {
    return (
        <div className='container max-auto px-4 py-8'>
            <Outlet/>
        </div>
    );
}; 

export default UserLayout;