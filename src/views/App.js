import React, { useEffect, Suspense } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Wrapper from './components/Layout/Wrapper/Wrapper';
import Footer from './components/Layout/Footer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PrivateRoute from './components/Routing/PrivateRoute';
import UserProfileScreen from './screens/user/UserProfileScreen';
import AdminRoutes from './components/Routing/AdminRoutes';
import Loader from '../views/components/Loader';
import Alert from '../views/components/Layout/Alert';
import { useTranslation } from 'react-i18next';
import ActivityType from './screens/activity/ActivityType';
import InfluenceForm from './screens/influence/InfluenceForm';
import AddOrganizationScreen from './screens/organization/AddOrganizationScreen';
import CommitmentForm from './screens/commitment/CommitmentForm';
import StakeholderRoutes from './components/Routing/StakeholderRoutes';
import ProjectRoutes from './components/Routing/ProjectRoutes';
import LocationRoutes from './components/Routing/LocationRoutes';

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
					<PrivateRoute path="/profile/:id" component={UserProfileScreen} />

					<Route component={ProjectRoutes} />
					<Route component={LocationRoutes} />
					<Route component={StakeholderRoutes} />

					<PrivateRoute path="/activities/register" component={ActivityType} />
					<PrivateRoute
						path="/organizations/register"
						component={AddOrganizationScreen}
					/>

					<PrivateRoute
						path="/influences/register/stakeholder/:stakeholderId"
						component={InfluenceForm}
					/>

					<PrivateRoute
						path="/commitments/register/activity/:activityId"
						component={CommitmentForm}
					/>

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
