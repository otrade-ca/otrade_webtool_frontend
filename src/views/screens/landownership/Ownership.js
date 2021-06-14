import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { BorderContainer } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const Ownership = ({ navigation }) => {
	const { next } = navigation;
	const { t } = useTranslation();

	// const dispatch = useDispatch();

	const [isStakeholderOwned, setStakeholderOwned] = useState('');

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
				<Form.Group controlId="isStakeholderOwned">
					<Row>
						<Col md={10}>
							<Form.Label>
								{t('landownership.stakeholderOwned.label')}
							</Form.Label>
						</Col>
						<Col md={2}>
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
						</Col>
					</Row>
				</Form.Group>
				<hr />

				<hr />

				<hr />
				<Row className="mt-2">
					<Col>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							{t('action.continue')}
						</Button>
					</Col>
				</Row>
			</Form>
		</BorderContainer>
	);
};

export default Ownership;
