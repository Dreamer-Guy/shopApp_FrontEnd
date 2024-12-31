import { Outlet } from 'react-router-dom';
import ShoppingHeader from '@/components/shop/header';
import ShoppingFooter from '@/components/shop/footer';

const UserLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <ShoppingHeader/>
            <main>
                <Outlet/>
            </main>
            <ShoppingFooter/>
        </div>
    );
}; 

export default UserLayout;