import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateUserProfile,
	getUserDetails,
} from '../../../application/actions/userActions';
import { USER_PROFILE_UPDATE_RESET } from '../../../application/constants/userConstants';
import {
	Loader,
	Message,
	CardContainer,
} from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const EditUserPhoto = ({ match, history }) => {
	const userId = match.params.id;

	const { t } = useTranslation();

	//define states
	const [image, setImage] = useState('');
	const [file, setFile] = useState(null);

	const dispatch = useDispatch();

	//get the user
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	//get success from user update
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success: successUpdate } = userUpdateProfile;

	useEffect(() => {
		if (successUpdate) {
			dispatch(getUserDetails(userId));
			dispatch({ type: USER_PROFILE_UPDATE_RESET });
		} else {
			setImage(user.image);
		}
	}, [dispatch, userId, user, successUpdate]);

	const uploadFileHandler = async (e) => {
		setFile(e.target.files[0]);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		//check password against confirmPassword
		dispatch(updateUserProfile(user._id, file, history));
	};

	return (
		<>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<CardContainer title={'Update Photo'}>
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
										{/* <Form.File
											id="image-file"
											label="Choose File"
											custom
											accept="image/*"
											onChange={uploadFileHandler}
										>
											{uploading && <Loader />}
										</Form.File> */}
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
								{t('action.update')}
							</Button>
						</Col>
					</Row>
				</Form>
			</CardContainer>
		</>
	);
};

export default EditUserPhoto;

// const formData = new FormData();
// formData.append('image', file);
// setUploading(true);

// try {
// 	const config = {
// 		headers: {
// 			'Content-Type': 'multipart/form-data',
// 		},
// 	};

// 	const { data } = await axios.post('/api/v1/uploads', formData, config);

// 	setImage(data);
// 	setUploading(false);
// } catch (error) {
// 	console.error(error);
// 	setUploading(false);
// }
