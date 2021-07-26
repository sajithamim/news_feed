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
    path: '/data/Users',
    key: "users",
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Specializations',
    path: '/data/Specializations',
    key: "spec",
    icon: <AiFillDatabase />
  },
  {
    title: 'Categories',
    path: '/data/Categories',
    key: "cat",
    icon: <AiFillCopy />
  },
  {
    title: 'Topics',
    path: '/data/topics',
    key: "topic",
    icon: <AiFillContainer />
  },
  {
    title: 'Ads',
    path: '/data/Ads',
    key: "ads",
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
        path: '/data/Policy',
        key: "Policy",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Terms And Conditions',
        path: '/data/Terms',
        key: "Terms",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Contact Us',
        path: '/data/Contact',
        key: "Contact",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'About Us',
        path: '/data/About',
        key: "About",
        icon: <IoIcons.IoIosPaper />,
      },
    ]
  },
  {
    title: 'Feedback',
    path: '/data/Feedback',
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
