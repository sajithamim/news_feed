import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { MdConfirmationNumber} from "react-icons/md";
import { AiFillDatabase, AiFillCopy, AiFillContainer, AiTwotoneLock, AiTwotoneUnlock} from "react-icons/ai";

export const routes = [
  {
    title: 'Data',
    layout: "/auth",
    path: '/data',
    key: "data",
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Users',
    layout: "/auth",
    path: '/users',
    key: "users",
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Specialities',
    layout: "/auth",
    path: '/specializations',
    key: "specializations",
    icon: <AiFillDatabase />
  },
  {
    title: 'Categories',
    layout: "/auth",
    path: '/categories',
    key: "categories",
    icon: <AiFillCopy />
  },
  {
    title: 'Topics',
    layout: "/auth",
    path: '/topics',
    key: "topics",
    icon: <AiFillContainer />
  },
  {
    title: 'Speciality Advertisements',
    layout: "/auth",
    path: '/advertisements',
    key: "advertisements",
    icon: <AiFillContainer />
  },
  {
    title: 'General Advertisement',
    layout: "/auth",
    path: '/genads',
    key: "genads",
    icon: <AiFillContainer />
  },
  {
    title: 'Settings',
    layout: "/auth",
    path: '/data',
    key: "settings",
    icon: <IoIcons.IoIosPaper />,
    subNav: [
      {
        title: 'Privacy policy',
        layout: "/auth",
        path: '/privacy_policy',
        key: "privacy_policy",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Terms And Conditions',
        layout: "/auth",
        path: '/terms',
        key: "terms",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Contact Us',
        layout: "/admin",
        path: '/contact',
        key: "Contact",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'About Us',
        layout: "/admin",
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
