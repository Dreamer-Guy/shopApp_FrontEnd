import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaGithubSquare } from "react-icons/fa";

const ShoppingFooter = () => {
    return (
        <div>
        <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo và Social Links */}
                    <div className="col-span-1 space-y-8">
                        <div className="flex items-center">
                            <span className="text-xl font-bold">RAF<span className="text-red-500">CART</span></span>
                        </div>
                        <div className="mr-2">
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, hic?
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <FaFacebookSquare size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <FaInstagramSquare size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <FaTwitterSquare size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <FaGithubSquare size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="grid grid-cols-2 gap-8">
                            {/* Solutions */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Solutions</h3>
                                <div className="mt-4 space-y-4">
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Marketing</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Analytics</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Commerce</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Insights</Link>
                                </div>
                            </div>

                            {/* Support */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
                                <div className="mt-4 space-y-4">
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Pricing</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Guides</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">API Status</Link>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {/* Solutions (Duplicate) */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Solutions</h3>
                                <div className="mt-4 space-y-4">
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Marketing</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Analytics</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Commerce</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Insights</Link>
                                </div>
                            </div>

                            {/* Support (Duplicate) */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
                                <div className="mt-4 space-y-4">
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Pricing</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">Guides</Link>
                                    <Link to="#" className="text-base text-gray-500 hover:text-gray-900 block">API Status</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        
        <div className="bg-gray-800 py-4">
            <div className="container flex items-center justify-between">
                <p className="text-white">&copy; TailCommerce - All Right Reserved</p>
                <div>
                    <img src="/assets/methods.png" alt="methods" className="h-5"/>
                </div>
            </div>
        </div>
        
        </div>
    );
};

export default ShoppingFooter;