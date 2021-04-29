import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { BorderContainer, Loader } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const PaperworkMeasurements = ({ navigation }) => {
	const { next, previous } = navigation;
	const { t } = useTranslation();

	const dispatch = useDispatch();

	const [paperworkExists, setPaperWorkExists] = useState('');
	const [paperwork, setPaperwork] = useState('');
	const [isLandMeasured, setLandMeasured] = useState('');
	const [measurements, setMeasurements] = useState('');
	const [image, setImage] = useState('');
	const [uploading, setUploading] = useState(false);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post('/api/v1/uploads', formData, config);

			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();

		//save landownership info
		// dispatch()

		// move to next part
		next();
	};

	return (
		<BorderContainer>
			<Form onSubmit={submitHandler} className="mt-4 mb-3">
				<Form.Group controlId="paperworkExists">
					<Row>
						<Col md={10}>
							<Form.Label>{t('landownership.paperworkExist.label')}</Form.Label>
						</Col>
						<Col md={2}>
							<Form.Control
								as="select"
								value={paperworkExists}
								onChange={(e) => setPaperWorkExists(e.target.value)}
							>
								<option value="">{t('action.select')}</option>
								<option value={t('landownership.paperworkExist.yes.')}>
									{t('landownership.paperworkExist.yes')}
								</option>
								<option value={t('landownership.paperworkExist.no.')}>
									{t('landownership.paperworkExist.no')}
								</option>
							</Form.Control>
						</Col>
					</Row>
				</Form.Group>
				<hr />
				<Row>
					<Col>
						<Form.Group controlId="image">
							<Form.Label>{t('landownership.paperwork.label')}</Form.Label>
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
									<Form.File
										id="image-file"
										label="Choose File"
										custom
										onChange={uploadFileHandler}
									>
										{uploading && <Loader />}
									</Form.File>
								</Col>
							</Row>
						</Form.Group>
					</Col>
				</Row>
				<hr className="mb-4" />
				<Row>
					<Col md={6}>
						<Form.Group controlId="isLandMeasured">
							<Form.Label>{t('landownership.landMeasured.label')}</Form.Label>

							<Form.Control
								as="select"
								value={isLandMeasured}
								onChange={(e) => setLandMeasured(e.target.value)}
							>
								<option value="">{t('action.select')}</option>
								<option value={t('landownership.landMeasured.yes.')}>
									{t('landownership.landMeasured.yes')}
								</option>
								<option value={t('landownership.landMeasured.no.')}>
									{t('landownership.landMeasured.no')}
								</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group controlId="measurements">
							<Form.Label>{t('landownership.measurements.label')}</Form.Label>
							<Form.Control
								type="text"
								value={measurements}
								placeholder="Enter Measurements"
								onChange={(e) => setMeasurements(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<hr />
				<Row className="mt-2">
					<Col>
						<Button
							onClick={previous}
							variant="primary"
							className="px-5 mt-3 mr-3"
						>
							Previous
						</Button>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							{t('action.continue')}
						</Button>
					</Col>
				</Row>
			</Form>
		</BorderContainer>
	);
};

export default PaperworkMeasurements;
