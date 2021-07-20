import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { AiFillDatabase, AiFillCopy, AiFillContainer, AiTwotoneLock, AiTwotoneUnlock } from "react-icons/ai";

export const routes = [
  {
    title: 'Data',
    path: '/data',
    key: "data",
    layout: "/admin",
    icon: <AiIcons.AiFillHome />,
    subNav: [
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
        title: 'Settings',
        path: '/data',
        key: "settings",
        icon: <IoIcons.IoIosPaper />,
        subNavItem: [
          {
            title: 'Users',
            path: '/data/Users',
            key: "users",
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
    ]
  },
  {
    title: 'Login',
    path: '/login',
    layout: '/auth',
    key: "login",
    icon: <AiTwotoneUnlock />,
  }
];
