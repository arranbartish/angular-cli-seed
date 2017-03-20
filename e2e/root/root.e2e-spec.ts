
import {RootPage} from './root.po';
import {HomePage} from '../home/home.po';
import {WaitCondition} from '../wait.conditions';
import {browser} from 'protractor';
const expect = global['chai'].expect;

describe('root page', () => {
  let page: RootPage;
  let homePage: HomePage;
  let condition: WaitCondition;

  beforeEach(() => {
    page = new RootPage();
    homePage = new HomePage();
    condition = new WaitCondition();
  });

  it('will display its title', () => {
    page.navigateTo();
    // change the following lines to have "eventually"
    expect(page.getParagraphText()).to.eventually.include('Listing search POC');
  });

  it('will redirect the URL to the home page', () => {
    page.navigateTo();
    condition.urlWillNotBe(page.uri());
    // change the following lines to have "eventually"
    expect(browser.getCurrentUrl()).to.eventually.include(homePage.uri());
  });
});
