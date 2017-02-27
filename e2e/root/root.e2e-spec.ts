
import {RootPage} from "./root.po";
import {HomePage} from "../home/home.po";
import {WaitCondition} from "../wait.conditions";
import {browser} from "protractor";

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
    expect(page.getParagraphText()).toEqual('Car search POC');
  });

  it('will redirect the URL to the home page', () => {
    page.navigateTo();
    condition.urlWillNotBe(page.uri());
    expect(browser.getCurrentUrl()).toContain(homePage.uri());
  });
});
