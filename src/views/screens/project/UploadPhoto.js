import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateProjectProfilePhoto,
	listProjectDetails,
} from '../../../application/actions/projectActions';
import { PROJECT_UPDATE_RESET } from '../../../application/constants/projectConstants';
import {
	Loader,
	Message,
	CardContainer,
} from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const UploadPhoto = ({ match, history }) => {
	const projectId = match.params.id;

	const { t } = useTranslation();

	//define states
	const [image, setImage] = useState('');
	const [file, setFile] = useState(null);

	const dispatch = useDispatch();

	//get project details
	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	//get success from project update
	const projectUpdate = useSelector((state) => state.projectUpdate);
	const { success: successUpdate } = projectUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch(listProjectDetails(projectId));
			dispatch({ type: PROJECT_UPDATE_RESET });
		} else {
			setImage(project.image);
		}
	}, [dispatch, projectId, project, successUpdate]);

	const uploadFileHandler = async (e) => {
		setFile(e.target.files[0]);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProjectProfilePhoto(
				{
					id: projectId,
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

export default withRouter(UploadPhoto);
