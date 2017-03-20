
import {SearchPage} from './search.po';
const expect = global['chai'].expect;

describe('search page', () => {
  let page: SearchPage;

  beforeEach(() => {
    page = new SearchPage();
  });

  it('will display its title', () => {
    page.navigateTo();

    // change the following lines to have "eventually"
    expect(page.getParagraphText()).to.eventually.contain('Listing search POC');
  });
});
