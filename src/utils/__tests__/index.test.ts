import { objectMap } from "..";

describe('#objectMap', () => {
    it('should return the expected result', () => {
        const testFn = (key, val) => [key, `${val}-result`]
        expect(objectMap({ 'some-key': 'some-value' }, testFn)).toStrictEqual({ 'some-key': 'some-value-result' })
    });
})
