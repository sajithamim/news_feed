import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { AiFillDatabase, AiFillCopy, AiFillContainer, AiTwotoneLock, AiTwotoneUnlock } from "react-icons/ai";

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
    key: "spec",
    icon: <AiFillDatabase />
  },
  {
    title: 'Categories',
    path: '/categories',
    key: "cat",
    icon: <AiFillCopy />
  },
  {
    title: 'Topics',
    path: '/topics',
    key: "topic",
    icon: <AiFillContainer />
  },
  {
    title: 'Advertisement',
    path: '/advertisements',
    key: "ads",
    icon: <AiFillContainer />
  },
  {
    title: 'Banner',
    path: '/banner',
    key: "banner",
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
        key: "Policy",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Terms And Conditions',
        path: '/terms',
        key: "Terms",
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
    path: '/feedback',
    key: "feed",
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Logout',
    path: '',
    key: "logout",
    icon: <AiTwotoneLock />
  },
];
