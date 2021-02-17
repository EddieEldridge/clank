import { convertArrayToString } from '../src/utils/utils';
import { expect } from 'chai';
import 'mocha';

describe('Convert Array<String> to string', 
  () => { 
    it('Should return a string', () => { 
      const stringArray: Array<string> = ['lotrgc', 'Legolas', 'Greenleaf'];
      const expectedResult: string = "lotrgc Legolas Greenleaf";
      const actualResult: string = convertArrayToString(stringArray, ",", true);
      expect(expectedResult).to.equal(actualResult); 
  }); 
});