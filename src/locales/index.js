import Vue from 'vue'
import VueI18n from 'vue-i18n'

import alert from './alert';

import header from './header';
import footer from './footer';

import home from './home';
import explorer from './explorer';
import creator from './creator';
import contactus from './contactus';
import faq from './faq';
import collection from './collection';
import nft from './nft';

let ko = {
  alert : alert.ko,
  header : header.ko,
  footer : footer.ko,
  home   : home.ko,
  explorer   : explorer.ko,
  creator   : creator.ko,
  contactus   : contactus.ko,
  faq   : faq.ko,
  collection   : collection.ko,
  nft   : nft.ko,
}

let en = {
  alert : alert.en,
  header : header.en,
  footer : footer.en,
  home   : home.en,
  explorer   : explorer.en,
  creator   : creator.en,
  contactus   : contactus.en,
  faq   : faq.en,
  collection   : collection.en,
  nft   : nft.en,
}

let cn = {
  alert : alert.cn,
  header : header.cn,
  footer : footer.cn,
  home   : home.cn,
  explorer   : explorer.cn,
  creator   : creator.cn,
  contactus   : contactus.cn,
  faq   : faq.cn,
  collection   : collection.cn,
  nft   : nft.cn,
}

Vue.use(VueI18n)
export default new VueI18n({
  locale: 'ko',
  fallbackLocale: 'ko',
  messages: { en, ko , cn }
})
