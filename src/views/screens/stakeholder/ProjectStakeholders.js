/**
 * List of stakeholders belonging to a project
 */
import React, { useEffect } from 'react';
import { Route, useRouteMatch, withRouter } from 'react-router-dom';
import { Accordion, Card, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Loader, Message, Empty } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import {
	listProjectStakeholders,
	deleteStakeholder,
} from '../../../application/actions/stakeholderActions';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SearchBox from '../../components/SearchBox';
import Stakeholder from '../../components/Entity/Stakeholder';

const ProjectStakeholders = ({
	match,
	listProjectStakeholders,
	deleteStakeholder,
	stakeholderDelete: { success },
	stakeholderProjectList: { loading, error, stakeholders, pages, page, count },
}) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	useEffect(() => {
		if (success) {
			listProjectStakeholders(projectId, keyword, pageNumber);
		} else {
			listProjectStakeholders(projectId, keyword, pageNumber);
		}
	}, [listProjectStakeholders, projectId, keyword, pageNumber, success]);

	const renderEmpty = () => {
		return (
			<>
				{stakeholders && stakeholders.length === 0 ? (
					<Empty url={url} type={'Stakeholder'} group={'stakeholders'} />
				) : (
					<Card.Header className="my-card-header">
						<h4>Stakeholders {`(${count})`}</h4>
					</Card.Header>
				)}
			</>
		);
	};

	//delete stakeholder
	const deleteHandler = (id) => {
		if (window.confirm('Click ok to delete')) {
			deleteStakeholder(id);
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
						{stakeholders && stakeholders.length === 0 ? null : (
							<Route
								render={({ history }) => (
									<SearchBox
										history={history}
										searchWord={'LastName'}
										searchQueryPath={`/project/${projectId}/stakeholders/search/`}
										searchQueryEmpty={`/project/${projectId}/stakeholders`}
									/>
								)}
							/>
						)}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{stakeholders &&
								stakeholders.map((item, index) => (
									<Stakeholder
										item={item}
										index={index}
										// deleteHandler={deleteHandler}
									/>
								))}
						</Accordion>
						<Row className="d-flex justify-content-center mt-2">
							<Paginate
								pages={pages}
								page={page}
								urlOne={`/project/${projectId}/stakeholders/search/`}
								urlTwo={`/project/${projectId}/stakeholders/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

// action creators
ProjectStakeholders.propTypes = {
	listProjectStakeholders: PropTypes.func.isRequired,
	deleteStakeholder: PropTypes.func.isRequired,
};

// reducers
const mapStateToProps = (state) => ({
	stakeholderProjectList: state.stakeholderProjectList,
	stakeholderDelete: state.stakeholderDelete,
});

export default connect(mapStateToProps, {
	listProjectStakeholders,
	deleteStakeholder,
})(withRouter(ProjectStakeholders));
