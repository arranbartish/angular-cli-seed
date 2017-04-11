import { HousingPage } from './housing.po';

const expect = global['chai'].expect;

describe('Housing listing page', () => {
    let page: HousingPage;

    beforeEach(() => {
        page = new HousingPage();
    });

  it('will have content', () => {
    page.navigateTo();
    // If you want to use something similar, do something like:
    // let i = browser.executeScript("return arguments[0].innerHTML;", element(locator));
    // This is noted in the CHANGELOG under the Protractor 5.0.0 release
    expect(page.getInnerContent()).to.eventually.exist;
    expect(page.getInnerContent()).to.eventually.contain('Sydney');
  });
});
