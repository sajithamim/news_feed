import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { MdConfirmationNumber} from "react-icons/md";
import { AiFillDatabase, AiFillCopy, AiFillContainer, AiTwotoneLock, AiTwotoneUnlock} from "react-icons/ai";

export const routes = [
  {
    title: 'Data',
    path: '/data',
    key: "data",
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Users',
    path: '/users',
    key: "users",
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Specialities',
    path: '/specializations',
    key: "specializations",
    icon: <AiFillDatabase />
  },
  {
    title: 'Categories',
    path: '/categories',
    key: "categories",
    icon: <AiFillCopy />
  },
  {
    title: 'Topics',
    path: '/topics',
    key: "topics",
    icon: <AiFillContainer />
  },
  {
    title: 'Speciality Advertisements',
    path: '/advertisements',
    key: "advertisements",
    icon: <AiFillContainer />
  },
  {
    title: 'General Advertisement',
    path: '/genads',
    key: "genads",
    icon: <AiFillContainer />
  },
  {
    title: 'Settings',
    path: '/data',
    key: "settings",
    icon: <IoIcons.IoIosPaper />,
    subNav: [
      {
        title: 'Privacy policy',
        path: '/privacy_policy',
        key: "privacy_policy",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Terms And Conditions',
        path: '/terms',
        key: "terms",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Contact Us',
        path: '/contact',
        key: "Contact",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'About Us',
        path: '/about',
        key: "About",
        icon: <IoIcons.IoIosPaper />,
      },
    ]
  },
  {
    title: 'Feedback',
    layout: "/admin",
    path: '/feedback',
    key: "feedback",
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Configuration',
    layout: "/admin",
    path: '/Configuration',
    key: "Configuration",
    icon: <MdConfirmationNumber/>
  },
  {
    title: 'Logout',
    layout: "/auth",
    path: '',
    key: "logout",
    icon: <AiTwotoneLock />
  },
];
