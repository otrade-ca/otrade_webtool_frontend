import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	getLocationDetails,
	updateLocationPhoto,
} from '../../../application/actions/locationActions';
import { LOCATION_UPDATE_RESET } from '../../../application/constants/locationConstants';
import {
	Loader,
	Message,
	CardContainer,
} from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const PhotoEdit = ({ match, history }) => {
	const locationId = match.params.id;

	const { t } = useTranslation();

	//define states
	const [image, setImage] = useState('');
	const [file, setFile] = useState(false);

	const dispatch = useDispatch();

	//get the stakeholder
	const locationDetails = useSelector((state) => state.locationDetails);
	const { loading, error, location } = locationDetails;

	//get success
	const stakeholderUpdate = useSelector((state) => state.stakeholderUpdate);
	const { success } = stakeholderUpdate;

	useEffect(() => {
		if (success) {
			dispatch(getLocationDetails(locationId));
			dispatch({ type: LOCATION_UPDATE_RESET });
		} else {
			setImage(location.image);
		}
	}, [dispatch, location, locationId, success]);

	const uploadFileHandler = async (e) => {
		setFile(e.target.files[0]);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('hello');
		dispatch(
			updateLocationPhoto(
				{
					id: locationId,
				},
				file,
				history
			)
		);
	};

	return (
		<>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<CardContainer title={'Upload Photo'}>
				<Form onSubmit={submitHandler}>
					<Row>
						<Col>
							<Form.Group controlId="image">
								<Form.Label>Image</Form.Label>
								<Row className="mb-3">
									<Col md={6}>
										<Form.Control
											type="text"
											placeholder="Enter image url"
											value={image}
											onChange={(e) => setImage(e.target.value)}
										></Form.Control>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<input
											type="file"
											accept="image/*"
											required
											onChange={uploadFileHandler}
										/>
									</Col>
								</Row>
							</Form.Group>
						</Col>
					</Row>
					<hr />
					<Row className="mt-3">
						<Col>
							<Button type="submit" variant="primary" className="px-5 mt-3">
								{t('action.submit')}
							</Button>
						</Col>
					</Row>
				</Form>
			</CardContainer>
		</>
	);
};

export default withRouter(PhotoEdit);
