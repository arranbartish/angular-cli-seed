import { browser, element, by, } from 'protractor';

export class HousingPage {

  uri() {
    return '/housing';
  }

  navigateTo() {
    return browser.get(this.uri());
  }

  getInnerContent() {
    const cssClass = 'house-list';
    return browser.executeScript('return document.getElementsByClassName(\'' + cssClass + '\')[0].innerHTML;');
  }
}
