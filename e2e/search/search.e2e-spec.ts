
import {SearchPage} from './search.po';

describe('search page', () => {
  let page: SearchPage;

  beforeEach(() => {
    page = new SearchPage();
  });

  it('will display its title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Car search POC');
  });
});
