import App from './App';
import uploadRoutes from './pages/upload/routes';
import filesRoutes from './pages/files/routes';

const routes = [
	{
		component: App,
		routes: [...uploadRoutes, ...filesRoutes]
	}
];

export default routes;