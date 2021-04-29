import React, { useEffect, useState } from 'react';
import { Row, Col, Accordion, Button, Card } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	listStakeholderOrganizations,
	deleteOrganization,
} from '../../../application/actions/organizationAction';
import {
	CardContainer,
	Message,
	Loader,
} from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';
import { ORGANIZATION_DELETE_REQUEST } from '../../../application/constants/organizationConstants';

const ListStakeholderOrganizations = ({ match }) => {
	const stakeholderId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	//get organizations for stakeholder
	const dispatch = useDispatch();
	const organizationStakeholderList = useSelector(
		(state) => state.organizationStakeholderList
	);

	const {
		loading,
		error,
		organizations,
		filtered,
	} = organizationStakeholderList;

	const organizationDelete = useSelector((state) => state.organizationDelete);
	const { success } = organizationDelete;

	//use state
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (success) {
			dispatch(listStakeholderOrganizations(stakeholderId));
			setMessage('Organization has been successfully deleted.');
			dispatch({ type: ORGANIZATION_DELETE_REQUEST });
		} else {
			dispatch(listStakeholderOrganizations(stakeholderId));
		}
	}, [dispatch, stakeholderId, success, message]);

	//delete user
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteOrganization(id));
		}
	};

	return (
		<>
			{message && <Message>{message}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<CardContainer searchWord={'Stakeholder'}></CardContainer>
			)}
		</>
	);
};

export default ListStakeholderOrganizations;

// {organizations && organizations.length === 0 ? (
// 	<Empty
// 		itemLink={'/register'}
// 		url={url}
// 		type={'Register'}
// 		group={'organizations'}
// 	/>
// ) : (
// 	<Card.Header className="my-card-header">
// 		<FilterBox searchWord={'StakeholderOrganizations'} />
// 		<Link
// 			to={`${url}/register`}
// 			className="btn btn-primary ml-2 mb-3"
// 		>
// 			<i className="fas fa-plus"></i> Register
// 		</Link>
// 	</Card.Header>
// )}
{
	/* <Accordion defaultActiveKey={1}>
	{filtered
		? filtered.map((item, index) => (
				<Card className="table-card">
					<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
						<p>{item.name}</p>
						<p>{item.createdAt.substring(0, 10)}</p>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey={index + 1}>
						<Card.Body>
							<div className="d-flex justify-content-between">
								<div>
									<p>
										{t('tables.organization')}
										{': '}
										<strong>
											<Link to={`${url}/${item._id}/profile`}>
												{item.name}
											</Link>
										</strong>
										<br />
										{t('organization.address')}
										{': '} <strong>{item.address}</strong>
										<br />
										{t('organization.email')}
										{': '} <strong>{item.email}</strong>
										<br />
										{t('organization.telephone')}
										{': '} <strong>{item.telephone}</strong>
										<br />
										{t('organization.registered')}
										{': '} {item.createdAt.substring(0, 10)}
									</p>
								</div>
								<div className="d-flex align-items-center">
									<Button
										variant="danger"
										className="btn-md ml-3"
										onClick={() => deleteHandler(item._id)}
									>
										<i className="fas fa-trash"></i> Delete
									</Button>
								</div>
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
		  ))
		: organizations &&
		  organizations.map((item, index) => (
				<Card className="table-card">
					<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
						<p>{item.name}</p>
						<p>{item.createdAt.substring(0, 10)}</p>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey={index + 1}>
						<Card.Body>
							<div className="d-flex justify-content-between">
								<div>
									<p>
										{t('tables.organization')}
										{': '}
										<strong>
											<Link to={`${url}/${item._id}/profile`}>
												{item.name}
											</Link>
										</strong>
										<br />
										{t('organization.address.label')}
										{': '} <strong>{item.address}</strong>
										<br />
										{t('organization.email.label')}
										{': '} <strong>{item.email}</strong>
										<br />
										{t('organization.telephone.label')}
										{': '} <strong>{item.telephone}</strong>
										<br />
										{t('organization.register_Date')}
										{': '} {item.createdAt.substring(0, 10)}
									</p>
								</div>
								<div className="d-flex align-items-center">
									<Button
										variant="danger"
										className="btn-md ml-3"
										onClick={() => deleteHandler(item._id)}
									>
										<i className="fas fa-trash"></i> Delete
									</Button>
								</div>
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
		  ))}
</Accordion> */
}
