/**
 * List all activities belonging to a stakeholder
 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Accordion, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	listStakeholderActivities,
	deleteActivity,
} from '../../../application/actions/activityActions';
import { Message, Loader, Empty } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Activity from '../../components/Entity/Activity';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';

const Activities = ({
	match,
	listStakeholderActivities,
	deleteActivity,
	activityStakeholderList: {
		stakeholderactivities,
		loading,
		error,
		pages,
		page,
		count,
	},
	activityDelete: { success },
}) => {
	const stakeholderId = match.params.id;
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	useEffect(() => {
		if (success) {
			listStakeholderActivities(stakeholderId, keyword, pageNumber);
		} else {
			listStakeholderActivities(stakeholderId, keyword, pageNumber);
		}
	}, [stakeholderId, success, listStakeholderActivities, keyword, pageNumber]);

	const renderEmpty = () => (
		<>
			{stakeholderactivities && stakeholderactivities.length === 0 ? (
				<Empty
					itemLink={`/activities/register/stakeholder/${stakeholderId}`}
					url={'/activities'}
					type={t('tables.activity')}
					group={'activities'}
				/>
			) : (
				<Card.Header className="my-card-header">
					<h4>
						{t('tables.activity')} {`(${count})`}
					</h4>
					<Link
						to={`/activities/register/stakeholder/${stakeholderId}`}
						className="btn btn-primary btn-sm ml-2"
					>
						<IconContext.Provider value={{ color: '#fff', size: '1.5em' }}>
							<IoIcons.IoIosAdd />
						</IconContext.Provider>{' '}
						{t('tables.activity')}
					</Link>
				</Card.Header>
			)}
		</>
	);

	//delete activity
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			deleteActivity(id);
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
						{/* <Route
							render={({ history }) => (
								<SearchBox
									history={history}
									searchWord={'activity'}
									searchQueryPath={`/stakeholder/${stakeholderId}/activities/search/`}
									searchQueryEmpty={`/stakeholder/${stakeholderId}/activities`}
								/>
							)}
						/> */}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{stakeholderactivities &&
								stakeholderactivities.map((item, index) => (
									<Activity
										item={item}
										index={index}
										linkView={`/stakeholder/${stakeholderId}/activities/${item._id}/view`}
										linkCommitment={`/stakeholder/${stakeholderId}/activities/${item._id}/commitment`}
									/>
								))}
						</Accordion>
						<Row className="d-flex justify-content-center mt-2">
							<Paginate
								pages={pages}
								page={page}
								urlOne={`/stakeholder/${stakeholderId}/activities/search/`}
								urlTwo={`/stakeholder/${stakeholderId}/activities/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

Activities.propTypes = {
	listStakeholderActivities: PropTypes.func.isRequired,
	deleteActivity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	activityStakeholderList: state.activityStakeholderList,
	activityDelete: state.activityDelete,
});

export default connect(mapStateToProps, {
	listStakeholderActivities,
	deleteActivity,
})(Activities);
