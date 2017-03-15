
import {SearchPage} from './search.po';
import { expect } from 'chai';

describe('search page', () => {
  let page: SearchPage;

  beforeEach(() => {
    page = new SearchPage();
  });

  it('will display its title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).to.contain('Car search POC');
  });
});
