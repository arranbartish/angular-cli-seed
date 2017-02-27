
import {HomePage} from "./home.po";
describe('Home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('will display its title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Car search POC');
  });

  xit('will have content', () => {
    pending('This just does not seem to work. Will resolve later');
    page.navigateTo();
    expect(page.getListingContent()).toBeDefined();
  });
});
