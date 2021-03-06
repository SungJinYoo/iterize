import { expect } from 'chai';
import { range, cycle } from '../src';

describe('Test Cycle API', () => {
    describe('Default case', () => {
        it('array type [0, 1, 2]', () => {
            const iter = cycle([0, 1, 2]);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
        });

        it("array type ['a', 'b', 'c']", () => {
            const iter = cycle(['a', 'b', 'c']);
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'b', done: false });
            expect(iter.next()).to.deep.equal({ value: 'c', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'b', done: false });
            expect(iter.next()).to.deep.equal({ value: 'c', done: false });
        });

        it('generator type [0, 1, 2, 3, 4] ', () => {
            const rangeGenerator = range(0, 5, 1);
            const iter = cycle(rangeGenerator);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
        });

        it('generator type [0, 2, 4] ', () => {
            const rangeGenerator = range(0, 5, 2);
            const iter = cycle(rangeGenerator);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
        });
    });

    describe('Edge case', () => {
        it('empty parameter', () => {
            // @ts-ignore
            expect(() => cycle(1).next()).to.throw(
                'Input parameter type is wrong.'
            );
            // @ts-ignore
            expect(() => cycle('a').next()).to.throw(
                'Input parameter type is wrong.'
            );
            expect(() => cycle([]).next()).to.throw('Array is Empty.');
        });
    });

    describe('Default case: Compatability with language specifications', () => {
        it('for - of (default)', () => {
            let count = 0;
            const tobe = [0, 1, 2, 0, 1, 2];
            const result = [];
            for (let n of cycle([0, 1, 2])) {
                if (count === 6) {
                    break;
                }
                result.push(n);
                count++;
            }
            expect(result).to.deep.equal(tobe);
        });

        it('for - of (generator)', () => {
            let count = 0;
            const tobe = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4];
            const result = [];
            const rangeGenerator = range(0, 5, 1);
            for (let n of cycle(rangeGenerator)) {
                if (count === 10) {
                    break;
                }
                result.push(n);
                count++;
            }
            expect(result).to.deep.equal(tobe);
        });
    });
});
