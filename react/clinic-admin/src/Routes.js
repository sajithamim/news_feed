import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { AiFillDatabase, AiFillCopy, AiFillContainer, AiTwotoneLock, AiTwotoneUnlock } from "react-icons/ai";
const logout = () => {
  console.log('test123')
}
export const routes = [
  {
    title: 'Data',
    path: '/data',
    key: "data",
    layout: "/admin",
    icon: <AiIcons.AiFillHome />,
    subNav: [
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
        title: 'Feedback',
        path: '/data/Feedback',
        key: "feed",
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Logout',
        path: '',
        key: "logout",
        icon: <AiTwotoneLock onClick={logout}/>
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
