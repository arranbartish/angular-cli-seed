
import {browser} from "protractor";

export const defaultWaitTime : number = 5000;

export class WaitCondition {

  urlWillNotBe(currentUrl : string) {
    browser.wait(this.urlChanged(currentUrl), defaultWaitTime);
  }

  private urlChanged (url) {
    return function () {
      return browser.getCurrentUrl().then(function(actualUrl) {
        return actualUrl.includes(url);
      }).catch(function (actualUrl) {
        expect(actualUrl).not.toContain(url);
      });
    };
  };
}
