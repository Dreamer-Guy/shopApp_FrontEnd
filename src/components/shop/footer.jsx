import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaGithubSquare } from "react-icons/fa";

const ShoppingFooter = () => {
    return (
        <div>
        <footer className="bg-black text-white pt-16 pb-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo và Social Links */}
                    <div className="col-span-1 space-y-8">
                        <div className="flex items-center">
                            <span className="text-xl font-bold">RAF<span className="text-red-500">CART</span></span>
                        </div>
                        <div className="mr-2">
                            <p className="text-gray-300">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, hic?
                            </p>
                        </div>
                        
                    </div>

                    {/* Links Grid */}
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="grid grid-cols-2 gap-8">
                            {/* Solutions */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Solutions</h3>
                                <div className="mt-4 space-y-4">
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Marketing</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Analytics</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Commerce</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Insights</Link>
                                </div>
                            </div>

                            {/* Support */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Support</h3>
                                <div className="mt-4 space-y-4">
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Pricing</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Documentation</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Guides</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">API Status</Link>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {/* Solutions (Duplicate) */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Company</h3>
                                <div className="mt-4 space-y-4">
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">About</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Blog</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Jobs</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Partners</Link>
                                </div>
                            </div>

                            {/* Support (Duplicate) */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Legal</h3>
                                <div className="mt-4 space-y-4">
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Privacy</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Terms</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Policy</Link>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors block">Licensing</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        
        <div className="bg-black border-t border-gray-800 py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <FaFacebookSquare size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <FaInstagramSquare size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <FaTwitterSquare size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <FaGithubSquare size={24} />
                    </a>
                </div>
                <div>
                    <img src="/assets/methods.png" alt="methods" className="h-5"/>
                </div>
                <p className="text-gray-400">Copyright &copy; 2024 Shop Pty. Ltd.</p>
            </div>
        </div>
        </div>
    );
};

export default ShoppingFooter;