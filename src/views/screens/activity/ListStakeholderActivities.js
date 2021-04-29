import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	listStakeholderActivities,
	deleteActivity,
} from '../../../application/actions/activityActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import FilterBox from '../../components/FilterBox';
import BorderContainer from '../../components/BorderContainer';
import TableHelper from '../../components/TableHelper';
import Activity from '../../components/Entity/Activity';

const ListStakeholderActivities = ({ match }) => {
	const stakeholderId = match.params.id;
	const { url } = useRouteMatch();

	//get activities
	const dispatch = useDispatch();
	const activityStakeholderList = useSelector(
		(state) => state.activityStakeholderList
	);

	const {
		loading,
		error,
		stakeholderactivities,
		filtered,
	} = activityStakeholderList;

	const activityDelete = useSelector((state) => state.activityDelete);
	const { success } = activityDelete;

	//useState
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (success) {
			dispatch(listStakeholderActivities(stakeholderId));
			setMessage('Activity has been successfully deleted');
		} else {
			dispatch(listStakeholderActivities(stakeholderId));
		}
	}, [dispatch, stakeholderId, success, message]);

	//delete activity
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteActivity(id));
		}
	};

	return (
		<BorderContainer>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{stakeholderactivities && stakeholderactivities.length === 0 ? (
						<>
							<Row>
								<Col md={12} className="d-flex justify-content-end">
									<Link to={`/activities/register`} className="btn btn-primary">
										<i className="fas fa-plus"></i> Register
									</Link>
								</Col>
							</Row>
							<Row>
								<div className="message-container">
									<strong>There are no activities registered.</strong>
								</div>
							</Row>
						</>
					) : (
						<Row className="align-items-center">
							<Col md={8} className="d-flex justify-content-end ml-2 mr-3">
								<FilterBox searchWord={'StakeholderActivities'} />
							</Col>
							<Col>
								<Link
									to={`${url}/register`}
									className="btn btn-primary ml-2 mb-3"
								>
									<i className="fas fa-plus"></i> Register
								</Link>
							</Col>
						</Row>
					)}
					<TableHelper>
						{filtered
							? filtered.map((activity, i) => (
									<tr key={activity._id}>
										<td>
											<Activity
												url={url}
												entity={activity}
												deleteHandler={deleteHandler}
												index={i}
											/>
										</td>
									</tr>
							  ))
							: stakeholderactivities &&
							  stakeholderactivities.map((activity, i) => (
									<tr key={activity._id}>
										<td>
											<Activity
												url={url}
												entity={activity}
												deleteHandler={deleteHandler}
												index={i}
											/>
										</td>
									</tr>
							  ))}
					</TableHelper>
				</>
			)}
		</BorderContainer>
	);
};

export default ListStakeholderActivities;
