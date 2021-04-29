import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar';
import InnerWrapper from './InnerWrapper';
import Header from '../Header/Header';
import '../layout.css';

const Wrapper = ({ children }) => {
	// toggle the sidebar menu
	// initial state of sidebar is false
	const [sidebar, setSidebar] = useState(true);
	// set to true when toggled
	const showSidebar = () => setSidebar(!sidebar);

	//call the userLogin reducer in the store
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	return (
		<div className={userInfo && sidebar ? 'wrapper' : 'wrapper closed'}>
			{userInfo && <Sidebar />}
			<InnerWrapper>
				<Header showSidebar={showSidebar} />
				{children}
			</InnerWrapper>
		</div>
	);
};

export default Wrapper;
