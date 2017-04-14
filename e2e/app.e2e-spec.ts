import { AngularCliSeedPage } from './app.po';
const expect = global['chai'].expect;

describe('angular-cli-seed App', () => {
  let page: AngularCliSeedPage;

  beforeEach(() => {
    page = new AngularCliSeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).to.eventually.contain('app works!');
  });
});
