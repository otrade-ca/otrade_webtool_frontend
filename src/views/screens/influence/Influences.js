import React from 'react';
import { useSelector } from 'react-redux';
import InfluenceForm from './InfluenceForm';

const Influences = (props) => {

    // get activity from localStorage
	const activity = useSelector((state) => state.activitySave);
	const { activityInfo } = activity;

    return (( activityInfo && 
                activityInfo.stakeholders.map((id, index) => (
                    <div className="mb-2">
                        <InfluenceForm key={index} {...props} id={id}/>
                    </div>
                )) 
            ));
}

export default Influences
