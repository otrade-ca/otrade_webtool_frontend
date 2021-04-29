import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
	{
		title: 'Projects',
		path: '/projects',
		icon: <AiIcons.AiOutlineProject />,
		cName: 'nav-text',
	},
	{
		title: 'Communities',
		path: '/locations',
		icon: <RiIcons.RiCommunityLine />,
		cName: 'nav-text',
	},
	{
		title: 'Stakeholders',
		path: '/stakeholders',
		icon: <IoIcons.IoMdPeople />,
		cName: 'nav-text',
	},
	// {
	// 	title: 'Settings',
	// 	path: '/settings',
	// 	icon: <IoIcons.IoMdSettings />,
	// 	cName: 'nav-text',
	// },
];
