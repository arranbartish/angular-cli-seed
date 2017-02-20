import { AngularCliSeedPage } from './app.po';

describe('angular-cli-seed App', function() {
  let page: AngularCliSeedPage;

  beforeEach(() => {
    page = new AngularCliSeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
