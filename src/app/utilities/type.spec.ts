import { expect } from 'chai';
import {type} from './type';

describe('type', () => {

  it('will have a useful description', () => {

    const validAction = {
      ALL: type('valid - All'),
      TYPES: type('valid - TYPES'),
      MUST: type('valid - MUST'),
      BE: type('valid - BE'),
      UNIQUE: type('valid - UNIQUE')
    };

    expect(validAction.UNIQUE).to.equal('valid - UNIQUE');
  });


  describe('when duplicates are defined', () => {

    it('will throw a meaningful error', () => {
      expect(() => {
        const invalidAction = {
          DUPLICATE: type('invalid - DUPLICATE'),
          LOOK_ALIKE: type('invalid - DUPLICATE')
        };
      }).to.throw('Action type "invalid - DUPLICATE" is not unique');
    });
  });

});
