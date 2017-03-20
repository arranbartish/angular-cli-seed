
import {HomePage} from './home.po';
const expect = global['chai'].expect;

describe('Home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('will display its title', () => {
    page.navigateTo();
    // change the following lines to have "eventually"
    expect(page.getParagraphText()).to.eventually.equal('Listing search POC');
  });

  it.skip('will have content', () => {
    // This just does not seem to work. Will resolve later
    page.navigateTo();
    // This line will not work. getInnerHtml has been deprecated by both
    // Protractor and selenium-webdriver.
    //
    // If you want to use something similar, do something like:
    // let i = browser.executeScript("return arguments[0].innerHTML;", element(locator));
    // This is noted in the CHANGELOG under the Protractor 5.0.0 release
    expect(page.getListingContent()).to.exist;
  });
});
