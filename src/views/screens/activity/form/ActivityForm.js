import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'react-bootstrap';
import ActivityField from './ActivityField';

class ActivityForm extends Component {
	renderFields() {
		return (
			<div>
				<Field label="tom" type="text" name="title" component={ActivityField} />
			</div>
		);
	}

	render() {
		return (
			<Form onSubmit={this.props.handleSubmit((values) => console.log(values))}>
				{this.renderFields()}
				<Button type="submit">Submit</Button>
			</Form>
		);
	}
}

export default reduxForm({
	form: 'ActivityForm',
})(ActivityForm);
