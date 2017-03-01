
import {RootPage} from './root/root.po';
describe('angular-cli-seed App', () => {
  let page: RootPage;

  beforeEach(() => {
    page = new RootPage();
  });

  it('will display its title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Car search POC');
  });
});
