import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { MdConfirmationNumber} from "react-icons/md";
import { AiFillDatabase, AiOutlineRead,  AiFillCopy, AiFillContainer, AiTwotoneLock, AiTwotoneUnlock} from "react-icons/ai";

export const routes = [
  {
    title: 'Home',
    path: '/data',
    key: "data",
    icon: <IoIcons.IoIosHome />
  },
  {
    title: 'Users',
    path: '/users',
    key: "users",
    icon: <IoIcons.IoIosPerson />
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
    icon: <IoIcons.IoMdJournal />
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
    icon: <IoIcons.IoIosSettings />,
    subNav: [
      {
        title: 'Privacy policy',
        path: '/privacy_policy',
        key: "privacy_policy",
        icon: <IoIcons.IoIosSettings />,
      },
      {
        title: 'Terms And Conditions',
        path: '/terms',
        key: "terms",
        icon: <IoIcons.IoIosSettings />,
      },
      {
        title: 'Contact Us',
        path: '/contact',
        key: "Contact",
        icon: <IoIcons.IoIosCall />,
      },
      {
        title: 'About Us',
        path: '/about',
        key: "About",
        icon: <IoIcons.IoIosSettings />,
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
    title: 'Quiz',
    layout: "/admin",
    path: '/quiz',
    key: "Quiz",
    icon: <AiOutlineRead />
  },
  {
    title: 'Configuration',
    layout: "/admin",
    path: '/Configuration',
    key: "Configuration",
    icon: <IoIcons.IoMdInformationCircleOutline/>
  },
  {
    title: 'Logout',
    layout: "/auth",
    path: '',
    key: "logout",
    icon: <IoIcons.IoMdLogOut />
  },
];
