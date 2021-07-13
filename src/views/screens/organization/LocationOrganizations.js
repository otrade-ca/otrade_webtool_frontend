/**
 * List of all the organizations belonging to a community
 */
import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Accordion, Button, Card, Row } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import {
	listLocationOrganizations,
	deleteOrganization,
} from '../../../application/actions/organizationAction';
import { Loader, Message, Empty } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import SearchBox from '../../components/SearchBox';
import { ORGANIZATION_DELETE_RESET } from '../../../application/constants/organizationConstants';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';
import * as VscIcons from 'react-icons/vsc';
import Moment from 'react-moment';
import Organization from '../../components/Entity/Organization';

const LocationOrganizations = ({
	match,
	listLocationOrganizations,
	deleteOrganization,
	organizationLocationList: {
		loading,
		error,
		organizations,
		pages,
		page,
		count,
	},
	organizationDelete: { success },
}) => {
	const locationId = match.params.id;
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	//get organizations
	const dispatch = useDispatch();

	useEffect(() => {
		if (success) {
			listLocationOrganizations(locationId, keyword, pageNumber);
			dispatch({ type: ORGANIZATION_DELETE_RESET });
		} else {
			listLocationOrganizations(locationId, keyword, pageNumber);
		}
	}, [
		dispatch,
		locationId,
		success,
		listLocationOrganizations,
		keyword,
		pageNumber,
	]);

	const renderEmpty = () => (
		<>
			{organizations && organizations.length === 0 ? (
				<Empty
					itemLink={`/organizations/register/community/${locationId}`}
					url={'/organizations'}
					type={t('tables.organization')}
					group={'organizations'}
				/>
			) : (
				<Card.Header className="my-card-header">
					<h4>{`Organizations (${count})`}</h4>
					<Link
						to={`/organizations/register/community/${locationId}`}
						className="btn btn-primary ml-2"
					>
						<i className="fas fa-plus"></i> {t('tables.organization')}
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
										searchQueryPath={`/community/${locationId}/organizations/search/`}
										searchQueryEmpty={`/community/${locationId}/organizations`}
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
								urlOne={`/community/${locationId}/organizations/search/`}
								urlTwo={`/community/${locationId}/organizations/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

LocationOrganizations.propTypes = {
	listLocationOrganizations: PropTypes.func.isRequired,
	deleteOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	organizationLocationList: state.organizationLocationList,
	organizationDelete: state.organizationDelete,
});

export default connect(mapStateToProps, {
	listLocationOrganizations,
	deleteOrganization,
})(LocationOrganizations);
