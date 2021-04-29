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
import ProjectScreen from './screens/project/ProjectScreen';
import StakeholderScreen from './screens/stakeholder/StakeholderScreen';
import StakeholdersUserList from './screens/stakeholder/StakeholdersUserList';
import AdminRoutes from './components/Routing/AdminRoutes';
import ActivityForm from './screens/activity/ActivityForm';
import LocationScreen from './screens/location/LocationScreen';
import Loader from '../views/components/Loader';
import Alert from '../views/components/Layout/Alert';
import { useTranslation } from 'react-i18next';
import UserProjects from './screens/project/UserProjects';
import UserLocationsList from './screens/location/UserLocations';

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
				<Container fluid="md" className="content-container">
					<Alert />
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/login" component={LoginScreen} />
					<PrivateRoute path="/profile/:id" component={UserProfileScreen} />

					{/*project routes*/}
					<PrivateRoute path="/projects/:id" component={UserProjects} />
					<PrivateRoute path="/project/:id" component={ProjectScreen} />

					{/*location routes*/}
					<PrivateRoute path="/locations/:id" component={UserLocationsList} />
					<PrivateRoute path="/location/:id" component={LocationScreen} />

					{/*stakeholder routes*/}
					<PrivateRoute
						path="/stakeholders/:id"
						component={StakeholdersUserList}
					/>
					<PrivateRoute path="/stakeholder/:id" component={StakeholderScreen} />
					<PrivateRoute
						exact
						path="/activities/register"
						component={ActivityForm}
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
