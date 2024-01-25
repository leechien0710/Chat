//Pages
import Admin from '../page/admin/admin';
import Dashboard from '../page/dashboard';
import History from '../page/history/history';
import Signup from '../page/signup/signup';
import Thank from '../page/thanks/thank';
import Login from './../page/login/index';
//Routes
const privateRoutes = [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    {path:'/dashboard', component: Dashboard},
    {path: '/history', component: History},
    {path: '/thank', component: Thank},
    {path: '/admin', component: Admin}
]
export { privateRoutes }
