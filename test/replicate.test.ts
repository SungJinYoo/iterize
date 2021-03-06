import { expect } from 'chai';
import { replicate, range } from '../src';

describe('Test Replicate API', () => {
    describe('Default case', () => {
        it('number type', () => {
            const iter = replicate(5, 0);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });

        it('string type', () => {
            const iter = replicate(5, 'a');
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });

        it('generator type', () => {
            const rangeGenerator = range(1, 5, 1);
            const iter = replicate(2, rangeGenerator);

            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });
    });

    describe('Edge case', () => {
        it('incorrect input parameter', () => {
            // @ts-ignore
            expect(() => replicate(5, ['a']).next()).to.throw(
                'Input parameter type is wrong.'
            );
            // @ts-ignore
            expect(() => replicate(5, () => 1).next()).to.throw(
                'Input parameter type is wrong.'
            );
            // @ts-ignore
            expect(() => replicate('a', 10).next()).to.throw(
                'Input parameter type is wrong.'
            );
        });
    });

    describe('Default case: Compatability with language specifications', () => {
        it('for - of(default)', () => {
            for (let n of replicate(5, 0)) {
                expect(n).equal(0);
            }
        });

        it('for - of(generator)', () => {
            const tobe = [1, 2, 3, 4, 1, 2, 3, 4];
            const result = [];
            const rangeGenerator = range(1, 5, 1);
            for (let n of replicate(2, rangeGenerator)) {
                result.push(n);
            }
            expect(result).to.deep.equal(tobe);
        });

        it('[...iterator]', () => {
            let str = [...replicate(5, 'a')];
            expect(str).to.deep.equal(['a', 'a', 'a', 'a', 'a']);
        });
    });
});
