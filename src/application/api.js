export const getURL = () => {
	if (process.env.NODE_ENV === 'development') {
		return '';
	}

	return 'https://otradewebapp.herokuapp.com';
};

export const getBucketInfo = (type) => {
	switch (type) {
		case 'user':
			return process.env.NODE_ENV === 'development'
				? {
						prependURL:
							'https://users-bucket-00-dev.s3.us-east-2.amazonaws.com/',
						bucket: 'users-bucket-00-dev',
				  }
				: {
						prependURL:
							'https://users-bucket-00-prd.s3.us-east-2.amazonaws.com/',
						bucket: 'users-bucket-00-prd',
				  };
		case 'project':
			return process.env.NODE_ENV === 'development'
				? {
						prependURL:
							'https://projects-bucket-00-dev.s3.us-east-2.amazonaws.com/',
						bucket: 'projects-bucket-00-dev',
				  }
				: {
						prependURL:
							'https://projects-bucket-00-prd.s3.us-east-2.amazonaws.com/',
						bucket: 'projects-bucket-00-prd',
				  };
		case 'community':
			return process.env.NODE_ENV === 'development'
				? {
						prependURL:
							'https://communities-bucket-00-dev.s3.us-east-2.amazonaws.com/',
						bucket: 'communities-bucket-00-dev',
				  }
				: {
						prependURL:
							'https://communities-bucket-00-prd.s3.us-east-2.amazonaws.com/',
						bucket: 'communities-bucket-00-prd',
				  };
		case 'organization':
			return process.env.NODE_ENV === 'development'
				? {
						prependURL:
							'https://organizations-bucket-00-dev.s3.us-east-2.amazonaws.com/',
						bucket: 'organizations-bucket-00-dev',
				  }
				: {
						prependURL:
							'https://organizations-bucket-00-prd.s3.us-east-2.amazonaws.com/',
						bucket: 'organizations-bucket-00-prd',
				  };
		case 'stakeholder':
			return process.env.NODE_ENV === 'development'
				? {
						prependURL:
							'https://stakeholders-bucket-00-dev.s3.us-east-2.amazonaws.com/',
						bucket: 'stakeholders-bucket-00-dev',
				  }
				: {
						prependURL:
							'https://stakeholders-bucket-00-prd.s3.us-east-2.amazonaws.com/',
						bucket: 'stakeholders-bucket-00-prd',
				  };
		default:
			return;
	}
};
