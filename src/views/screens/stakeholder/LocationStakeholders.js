import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Accordion, Card, Row } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import { Loader, Message, Empty } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import {
	deleteStakeholder,
	listLocationStakeholders,
} from '../../../application/actions/stakeholderActions';
import { STAKEHOLDER_DELETE_RESET } from '../../../application/constants/stakeholderConstants';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SearchBox from '../../components/SearchBox';
import Stakeholder from '../../components/Entity/Stakeholder';

const LocationStakeholders = ({
	match,
	listLocationStakeholders,
	deleteStakeholder,
	stakeholderDelete: { success },
	stakeholderLocationList: { loading, error, stakeholders, pages, page, count },
}) => {
	const communityId = match.params.id;
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	//get stakeholders
	const dispatch = useDispatch();

	useEffect(() => {
		if (success) {
			listLocationStakeholders(communityId, keyword, pageNumber);
			dispatch({ type: STAKEHOLDER_DELETE_RESET });
		} else {
			listLocationStakeholders(communityId, keyword, pageNumber);
		}
	}, [
		dispatch,
		keyword,
		communityId,
		success,
		listLocationStakeholders,
		pageNumber,
	]);

	const renderEmpty = () => {
		return (
			<>
				{stakeholders && stakeholders.length === 0 ? (
					<Empty
						itemLink={`/stakeholders/register/community/${communityId}`}
						url={`/stakeholders`}
						type={t('tables.stakeholder')}
						group={'stakeholders'}
					/>
				) : (
					<Card.Header className="my-card-header">
						<h4>{`Stakeholders (${count})`}</h4>
						<Link
							to={`/stakeholders/register/community/${communityId}`}
							className="btn btn-primary ml-2"
						>
							<i className="fas fa-plus"></i> {t('tables.stakeholder')}
						</Link>
					</Card.Header>
				)}
			</>
		);
	};

	//delete stakeholder
	const deleteHandler = (id) => {
		if (window.confirm('Click ok to delete')) {
			dispatch(deleteStakeholder(id));
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
										searchQueryPath={`/community/${communityId}/stakeholders/search/`}
										searchQueryEmpty={`/community/${communityId}/stakeholders`}
									/>
								)}
							/>
						)}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{stakeholders &&
								stakeholders.map((item, index) => (
									<Stakeholder item={item} index={index} />
								))}
						</Accordion>
						<Row className="d-flex justify-content-center mt-2">
							<Paginate
								pages={pages}
								page={page}
								urlOne={`/community/${communityId}/stakeholders/search/`}
								urlTwo={`/community/${communityId}/stakeholders/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

LocationStakeholders.propTypes = {
	listLocationStakeholders: PropTypes.func.isRequired,
	deleteStakeholder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	stakeholderLocationList: state.stakeholderLocationList,
	stakeholderDelete: state.stakeholderDelete,
});

export default connect(mapStateToProps, {
	listLocationStakeholders,
	deleteStakeholder,
})(LocationStakeholders);
