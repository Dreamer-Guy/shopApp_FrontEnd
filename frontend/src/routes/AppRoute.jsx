    import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";

const AppRoute = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStatus());
    }, 
    []);
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    )
};

export default AppRoute;