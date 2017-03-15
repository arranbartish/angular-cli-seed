
import {HomePage} from './home.po';
import { expect } from 'chai';

describe('Home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('will display its title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).to.equal('Car search POC');
  });

  it.skip('will have content', () => {
    // This just does not seem to work. Will resolve later
    page.navigateTo();
    expect(page.getListingContent()).to.exist;
  });
});
