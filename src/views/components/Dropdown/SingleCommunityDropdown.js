/**
 * Dropdown displaying all communities in a project
 */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import { listDropdownLocations } from '../../../application/actions/locationActions';
import { assignLocation } from '../../../application/actions/locationActions';
import { Loader, Message } from '../../components/HelperComponents';

const SingleCommunityDropdown = ({ label, id }) => {
	// get list of stakeholders
	const dispatch = useDispatch();
	const locationListDropdown = useSelector(
		(state) => state.locationListDropdown
	);
	const { loading, error, locations } = locationListDropdown;

	// useState
	const [community, setCommunity] = useState('');

	useEffect(() => {
		dispatch(listDropdownLocations(id));
	}, [dispatch, id]);

	const handleInputChange = (e) => {
		e.preventDefault();
		setCommunity(e.target.value);
		dispatch(assignLocation(community));
	};

	const renderOptions = () => (
		<>
			<option value="">--Select--</option>
			{locations &&
				locations.map((item, index) => (
					<option value={item._id} key={index}>
						{item.location}
					</option>
				))}
		</>
	);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error.message}</Message>
			) : (
				<Row className="mt-2">
					<Col md={8}>
						<Form.Label>{label}</Form.Label>
						<Form.Control
							as="select"
							value={community}
							onChange={(e) => handleInputChange(e)}
							className="px-5 mb-2"
						>
							{renderOptions()}
						</Form.Control>
					</Col>
				</Row>
			)}
		</>
	);
};

export default withRouter(SingleCommunityDropdown);
