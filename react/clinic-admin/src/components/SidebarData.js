import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { AiFillDatabase,AiFillCopy,AiFillContainer,AiTwotoneLock} from "react-icons/ai";

export const SidebarData = [
  {
    title: 'Data',
    path: '/data',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Specializations',
        path: '/data/Specializations',
        icon: <AiFillDatabase/>
      },
      {
        title: 'Categories',
        path: '/data/Categories',
        icon: <AiFillCopy />
      },
      {
        title: 'Topics',
        path: '/data/Topics',
        icon: <AiFillContainer/>
      },
      {
        title: 'Feedback',
        path: '/data/Feedback',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Logout',
        path: '/data/Logout',
        icon: <AiTwotoneLock />
      },
    ]
  },
];
