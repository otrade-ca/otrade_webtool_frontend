/**
 * List all organizations a stakeholder belongs to
 */
import React, { useEffect } from 'react';
import { Accordion, Card, Row } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import {
	listStakeholderOrganizations,
	deleteOrganization,
} from '../../../application/actions/organizationAction';
import { Empty, Message, Loader } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import { useTranslation } from 'react-i18next';
import { ORGANIZATION_DELETE_REQUEST } from '../../../application/constants/organizationConstants';
import PropTypes from 'prop-types';
import SearchBox from '../../components/SearchBox';
import Organization from '../../components/Entity/Organization';

const StakeholderOrganizations = ({
	match,
	listStakeholderOrganizations,
	deleteOrganization,
	organizationStakeholderList: {
		loading,
		error,
		organizations,
		pages,
		page,
		count,
	},
	organizationDelete: { success },
}) => {
	const stakeholderId = match.params.id;
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	//get organizations for stakeholder
	const dispatch = useDispatch();

	useEffect(() => {
		if (success) {
			listStakeholderOrganizations(stakeholderId, keyword, pageNumber);
			dispatch({ type: ORGANIZATION_DELETE_REQUEST });
		} else {
			listStakeholderOrganizations(stakeholderId, keyword, pageNumber);
		}
	}, [
		dispatch,
		stakeholderId,
		success,
		keyword,
		pageNumber,
		listStakeholderOrganizations,
	]);

	const renderEmpty = () => (
		<>
			{organizations && organizations.length === 0 ? (
				<Empty
					itemLink={`/organizations/register/stakeholder/${stakeholderId}`}
					url={'/organizations'}
					type={t('tables.organization')}
					group={'organizations'}
				/>
			) : (
				<Card.Header className="my-card-header">
					<h4>{`Organizations (${count})`}</h4>
					<Link
						to={`/organizations/register/stakeholder/${stakeholderId}`}
						className="btn btn-primary ml-2"
					>
						<i className="fas fa-plus"></i> Organization
					</Link>
				</Card.Header>
			)}
		</>
	);

	//delete user
	const deleteHandler = (id) => {
		if (window.confirm('Click ok to delete')) {
			deleteOrganization(id);
		}
	};

	return (
		<Card className="my-card">
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{renderEmpty()}
					<Card.Body>
						{organizations && organizations.length === 0 ? null : (
							<Route
								render={({ history }) => (
									<SearchBox
										history={history}
										searchWord={'organization'}
										searchQueryPath={`/stakeholder/${stakeholderId}/organizations/search/`}
										searchQueryEmpty={`/stakeholder/${stakeholderId}/organizations`}
									/>
								)}
							/>
						)}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{organizations &&
								organizations.map((item, index) => (
									<Organization item={item} index={index} />
								))}
						</Accordion>
						<Row className="d-flex justify-content-center mt-2">
							<Paginate
								pages={pages}
								page={page}
								urlOne={`/stakeholder/${stakeholderId}/organizations/search/`}
								urlTwo={`/stakeholder/${stakeholderId}/organizations/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

StakeholderOrganizations.propTypes = {
	listStakeholderOrganizations: PropTypes.func.isRequired,
	deleteOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	organizationStakeholderList: state.organizationStakeholderList,
	organizationDelete: state.organizationDelete,
});

export default connect(mapStateToProps, {
	listStakeholderOrganizations,
	deleteOrganization,
})(StakeholderOrganizations);
