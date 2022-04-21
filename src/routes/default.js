/*
import MainLayout from "@/skin/default/Layouts/MainLayout";
import Home from "@/skin/default/Home/Home";
import Contacts from "@/skin/default/Contacts/Contacts";
import Explorer from "@/skin/default/Explorer/Explorer";
import Nft from "@/skin/default/Nft/Nft";
import Help from "@/skin/default/Contacts/Help";
import Authors from "@/skin/default/Authors/Authors";
import Create from "@/skin/default/Profile/Create";
import Profile from "@/skin/default/Profile/Profile";
import Privacy from "@/skin/default/Terms/Privacy";
import Nfts from "@/skin/default/Profile/Nfts";
import Service from "@/skin/default/Terms/Service";
import ExplorerNfts from "@/skin/default/Explorer/ExplorerNfts";
import Setting from "@/skin/default/Profile/Setting";
import AuthApply from "../skin/default/Profile/AuthApply";
*/
const MainLayout = () => import("@/skin/default/Layouts/MainLayout");
const Home  = () => import( "@/skin/default/Home/Home");
const Contacts  = () => import( "@/skin/default/Contacts/Contacts");
const Explorer  = () => import( "@/skin/default/Explorer/Explorer");
const Nft  = () => import( "@/skin/default/Nft/Nft");
const Help  = () => import( "@/skin/default/Contacts/Help");
const Authors  = () => import( "@/skin/default/Authors/Authors");
const Create  = () => import( "@/skin/default/Profile/Create");
const Profile  = () => import( "@/skin/default/Profile/Profile");
const Privacy  = () => import( "@/skin/default/Terms/Privacy");
const Nfts  = () => import( "@/skin/default/Profile/Nfts");
const Service  = () => import( "@/skin/default/Terms/Service");
const ExplorerNfts  = () => import( "@/skin/default/Explorer/ExplorerNfts");
const Setting  = () => import( "@/skin/default/Profile/Setting");
const AuthApply  = () => import("../skin/default/Profile/AuthApply");

const routes = [
  {
    path: '/',
    component: MainLayout,
    name: 'MainLayout',

    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/explorer',
        name: 'explorer',
        component: Explorer,
        redirect : '/explorer/all',
        children: [
          {
            path: ':tab',
            name: 'ExplorerNfts',
            component: ExplorerNfts
          }
        ]
      },
      {
        path: '/nft/:nft_id',
        name: 'Nft',
        component: Nft,
      },
      {
        path: '/authors/:tab',
        name: 'authors',
        component: Authors,
      },
      {
        path: '/profile/:address',
        name: 'Profile',
        component: Profile,
        redirect : '/profile/:address/nfts/sale',
        children: [
          {
            path: 'nfts/:tab',
            name: 'Nfts',
            component: Nfts
          },
          {
            path: 'setting',
            name: 'Setting',
            component: Setting
          },
          {
            path: 'auth',
            name: 'AuthApply',
            component: AuthApply
          },
          {
            path: 'create',
            name: 'Create',
            component: Create
          },
        ]
      },
      {
        path: '/help',
        name: 'Help',
        component: Help,
      },
      {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts,
      },
      {
        path: '/privacy',
        name: 'Privacy',
        component: Privacy,
      },
      {
        path: '/service',
        name: 'Service',
        component: Service,
      },

    ]
  }
];

export default routes;
