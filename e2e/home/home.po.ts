import { browser, element, by,  } from 'protractor';

export class HomePage {

  uri() {
    return '/home';
  }

  navigateTo() {
    return browser.get(this.uri());
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
