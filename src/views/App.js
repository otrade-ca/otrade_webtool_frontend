import React, { useEffect, Suspense } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Wrapper from './components/Layout/Wrapper/Wrapper';
import Footer from './components/Layout/Footer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AdminRoutes from './components/Routing/AdminRoutes';
import Loader from '../views/components/Loader';
import Alert from '../views/components/Layout/Alert';
import { useTranslation } from 'react-i18next';

import StakeholderRoutes from './components/Routing/StakeholderRoutes';
import UserRoutes from './components/Routing/UserRoutes';
import ProjectRoutes from './components/Routing/ProjectRoutes';
import LocationRoutes from './components/Routing/LocationRoutes';
import OrganizationRoutes from './components/Routing/OrganizationRoutes';
import ActivityRoutes from './components/Routing/ActivityRoutes';
import InfluenceRoutes from './components/Routing/InfluenceRoutes';
import CommitmentRoutes from './components/Routing/CommitmentRoutes';

const Home = () => {
	const { i18n } = useTranslation();

	useEffect(() => {
		//call ipo code here
		const getGeoInfo = async () => {
			const {
				data: { country_code },
			} = await axios.get('https://ipapi.co/json');
			const code = validateCode(country_code);
			i18n.changeLanguage(code);
		};

		getGeoInfo();
		// eslint-disable-next-line
	}, []);

	const validateCode = (code) => {
		if (code.includes('BR')) return 'po';
		if (code.includes('CO') || code.includes('EC') || code.includes('MX'))
			return 'sp';
		return 'en';
	};

	return (
		<Router>
			<Wrapper>
				<Container fluid="lg" className="content-container">
					<Alert />
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/login" component={LoginScreen} />

					{/**General Routes */}
					<Route component={UserRoutes} />
					<Route component={ProjectRoutes} />
					<Route component={LocationRoutes} />
					<Route component={StakeholderRoutes} />
					<Route component={OrganizationRoutes} />
					<Route component={ActivityRoutes} />
					<Route component={InfluenceRoutes} />
					<Route component={CommitmentRoutes} />

					{/**Admin Routes */}
					<Route component={AdminRoutes} />
				</Container>
				<Footer />
			</Wrapper>
		</Router>
	);
};

export default function App() {
	return (
		<Suspense fallback={<Loader />}>
			<Home />
		</Suspense>
	);
}
