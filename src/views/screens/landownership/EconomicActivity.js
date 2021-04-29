import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { BorderContainer } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const EconomicActivity = ({ navigation }) => {
	const { next, previous } = navigation;
	const { t } = useTranslation();

	// const dispatch = useDispatch();

	const [economicActivityExists, setEcoActExists] = useState('');
	const [economicActivity, setEcoAct] = useState('');
	const [impactToProjectExists, setImpProjExists] = useState('');
	const [comments, setComments] = useState('');

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
				<Row>
					<Col md={6}>
						<Form.Group controlId="economicActivityExists">
							<Form.Label>
								{t('landownership.economicActivityExist.label')}
							</Form.Label>

							<Form.Control
								as="select"
								value={economicActivityExists}
								onChange={(e) => setEcoActExists(e.target.value)}
							>
								<option value="">{t('action.select')}</option>
								<option value={t('landownership.economicActivityExist.yes.')}>
									{t('landownership.economicActivityExist.yes')}
								</option>
								<option value={t('landownership.economicActivityExist.no.')}>
									{t('landownership.economicActivityExist.no')}
								</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group controlId="economicActivity">
							<Form.Label>
								{t('landownership.economicActivity.label')}
							</Form.Label>
							<Form.Control
								as="select"
								value={economicActivity}
								onChange={(e) => setEcoAct(e.target.value)}
							>
								<option value="">{t('action.select')}</option>
								<option value={t('landownership.economicActivity.housing.')}>
									{t('landownership.economicActivity.housing')}
								</option>
								<option value={t('landownership.economicActivity.pasteur.')}>
									{t('landownership.economicActivity.pasteur')}
								</option>
								<option value={t('landownership.economicActivity.crops.')}>
									{t('landownership.economicActivity.crops')}
								</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col md={4}>
						<Form.Group controlId="impactToProjectExists">
							<Form.Label>{t('landownership.impactProject.label')}</Form.Label>
							<Form.Control
								as="select"
								value={impactToProjectExists}
								onChange={(e) => setImpProjExists(e.target.value)}
							>
								<option value="">{t('action.select')}</option>
								<option value={t('landownership.impactProject.yes.')}>
									{t('landownership.impactProject.yes')}
								</option>
								<option value={t('landownership.impactProject.no.')}>
									{t('landownership.impactProject.no')}
								</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col md={12}>
						<Form.Group controlId="comments">
							<Form.Label>{t('landownership.comments.label')}</Form.Label>
							<Form.Control
								as="textarea"
								rows="6"
								value={comments}
								onChange={(e) => setComments(e.target.value)}
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
export default EconomicActivity;
