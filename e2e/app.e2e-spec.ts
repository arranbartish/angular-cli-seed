
import {RootPage} from './root/root.po';
const expect = global['chai'].expect;

describe('angular-cli-seed App', () => {
  let page: RootPage;

  beforeEach(() => {
    page = new RootPage();
  });

  it('will do normal tests', () => {
    expect(true).to.be.ok;
  });

  it('will display its title', () => {
    page.navigateTo();
    // change the following lines to have "eventually"
    expect(page.getParagraphText()).to.eventually.contain('Listing search POC');
  });
});
