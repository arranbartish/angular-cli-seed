import { browser, element, by } from 'protractor';

export class RootPage {

  uri() {
    return '/';
  }

  navigateTo() {
    return browser.get('http://localhost:4200/');
    //return browser.get(this.uri());
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
