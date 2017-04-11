
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
});
