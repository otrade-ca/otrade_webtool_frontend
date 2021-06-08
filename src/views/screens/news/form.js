import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import MemberDropdownProject from '../../components/MemberDropdownProject';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const NewsForm = () => {
	return <div>News Source</div>;
};

NewsForm.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(NewsForm);
