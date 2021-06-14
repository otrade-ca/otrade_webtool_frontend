import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import MemberDropdownProject from '../../components/MemberDropdownProject';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const NewsEdit = () => {
	return <div>News Edit</div>;
};

NewsEdit.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(NewsEdit);
