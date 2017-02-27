import { browser, element, by } from 'protractor';

export class SearchPage {
  navigateTo() {
    return browser.get('/search');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
