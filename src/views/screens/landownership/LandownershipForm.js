import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { CardContainer } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const LandownershipForm = () => {
	const { t } = useTranslation();

	//state
	const [negotiationProgress, setNegProgress] = useState('pro');
	const [isStakeholderOwned, setStakeholderOwned] = useState('stkowned');
	const [paperworkExists, setPaperWorkExists] = useState('papexis');
	const [paperwork, setPaperwork] = useState('paperwork');
	const [isLandMeasured, setLandMeasured] = useState('landmea');
	const [measurements, setMeasurements] = useState('meas');
	const [economicActivityExists, setEcoActExists] = useState('act exis');
	const [economicActivity, setEcoAct] = useState('act');
	const [impactToProjectExists, setImpProjExists] = useState('porjimp');
	const [comments, setComments] = useState('comments');

	//stakeholders
	const [stakeholders, setStakeholders] = useState('');
	const [organizations, setOrganizations] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
	};

	return (
		<CardContainer title={'Landownership'}>
			<Form onSubmit={submitHandler} className="mt-4 mb-3">
				<Row>
					<Col md={12}>
						<Form.Group controlId="negotiation_Progress">
							<Form.Label>
								{t('landownership.negotiationProgress.label')}
							</Form.Label>
							<Form.Control
								as="select"
								value={negotiationProgress}
								required
								onChange={(e) => setNegProgress(e.target.value)}
							>
								<option value="">{t('action.select')}</option>
								<option value={t('landownership.negotiationProgress.contact.')}>
									{t('landownership.negotiationProgress.contact')}
								</option>
								<option value={t('landownership.negotiationProgress.initial')}>
									{t('landownership.negotiationProgress.initial')}
								</option>
								<option value={t('landownership.negotiationProgress.survey')}>
									{t('landownership.negotiationProgress.survey')}
								</option>
								<option
									value={t('landownership.negotiationProgress.purchased')}
								>
									{t('landownership.negotiationProgress.purchased')}
								</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Form.Group controlId="isStakeholderOwned">
							<Form.Label>
								{t('landownership.stakeholderOwned.label')}
							</Form.Label>
							<Form.Control
								as="select"
								value={isStakeholderOwned}
								required
								onChange={(e) => setStakeholderOwned(e.target.value)}
							>
								<option value="">{t('action.select')}</option>
								<option value={t('landownership.stakeholderOwned.yes.')}>
									{t('landownership.stakeholderOwned.yes')}
								</option>
								<option value={t('landownership.stakeholderOwned.no.')}>
									{t('landownership.stakeholderOwned.no')}
								</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Form.Group controlId="paperworkExists">
							<Form.Label>{t('landownership.paperworkExist.label')}</Form.Label>
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
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Form.Group controlId="paperwork">
							<Form.Label>{t('landownership.paperwork.label')}</Form.Label>
							<Form.Control
								as="select"
								value={paperwork}
								onChange={(e) => setPaperwork(e.target.value)}
							>
								<option value="">{t('action.select')}</option>
								<option value={t('landownership.paperwork.yes.')}>
									{t('landownership.paperwork.yes')}
								</option>
								<option value={t('landownership.paperwork.no.')}>
									{t('landownership.paperwork.no')}
								</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
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
				</Row>
				<Row>
					<Col md={12}>
						<Form.Group controlId="measurements">
							<Form.Label>{t('landownership.measurements.label')}</Form.Label>
							<Form.Control
								type="text"
								value={measurements}
								onChange={(e) => setMeasurements(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
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
				</Row>
				<Row>
					<Col md={12}>
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
				<Row>
					<Col md={12}>
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
				<Row>
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
				<Row>
					<Col>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							Continue
						</Button>
					</Col>
				</Row>
			</Form>
		</CardContainer>
	);
};

export default LandownershipForm;
