import MainLayout from "@/views/Layouts/MainLayout";
import Home from "@/views/Home/Home";
import Contacts from "@/views/Contacts/Contacts";
import Explorer from "@/views/Explorer/Explorer";
import Nft from "@/views/Nft/Nft";
import Help from "@/views/Contacts/Help";
import Authors from "@/views/Authors/Authors";
import Create from "@/views/Profile/Create";
import Profile from "@/views/Profile/Profile";
import Privacy from "@/views/Terms/Privacy";
import Nfts from "@/views/Profile/Nfts";
import Service from "@/views/Terms/Service";
import ExplorerNfts from "@/views/Explorer/ExplorerNfts";
import Setting from "@/views/Profile/Setting";
import AuthApply from "../views/Profile/AuthApply";


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
