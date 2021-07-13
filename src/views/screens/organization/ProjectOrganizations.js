/**
 * List of all organizations belonging to a project
 */
import React, { useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { Accordion, Button, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import {
	listProjectOrganizations,
	deleteOrganization,
} from '../../../application/actions/organizationAction';
import { Loader, Message, Empty } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import SearchBox from '../../components/SearchBox';
import { ORGANIZATION_DELETE_RESET } from '../../../application/constants/organizationConstants';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Organization from '../../components/Entity/Organization';

const ProjectOrganizations = ({
	match,
	listProjectOrganizations,
	deleteOrganization,
	organizationDelete: { success },
	organizationProjectList: {
		loading,
		error,
		organizations,
		pages,
		page,
		count,
	},
}) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	//get organizations
	const dispatch = useDispatch();

	useEffect(() => {
		if (success) {
			listProjectOrganizations(projectId, keyword, pageNumber);
			dispatch({ type: ORGANIZATION_DELETE_RESET });
		} else {
			listProjectOrganizations(projectId, keyword, pageNumber);
		}
	}, [
		dispatch,
		projectId,
		success,
		listProjectOrganizations,
		keyword,
		pageNumber,
	]);

	const renderEmpty = () => (
		<>
			{organizations && organizations.length === 0 ? (
				<Empty url={url} type={'Organization'} group={'organizations'} />
			) : (
				<Card.Header className="my-card-header">
					<h4>Organizations {`(${count})`}</h4>
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
										searchQueryPath={`/project/${projectId}/organizations/search/`}
										searchQueryEmpty={`/project/${projectId}/organizations`}
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
								urlOne={`/project/${projectId}/organizations/search/`}
								urlTwo={`/project/${projectId}/organizations/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

ProjectOrganizations.propTypes = {
	listProjectOrganizations: PropTypes.func.isRequired,
	deleteOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	organizationProjectList: state.organizationProjectList,
	organizationDelete: state.organizationDelete,
});

export default connect(mapStateToProps, {
	listProjectOrganizations,
	deleteOrganization,
})(ProjectOrganizations);
