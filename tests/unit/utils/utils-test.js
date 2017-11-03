
import { module, test } from 'qunit';
import * as utils from 'ember-fusioncharts/utils/utils';

module('Unit | Utility | Utils');

test(`utils.isObject should return false when primitive value is passed`, function (assert) {
    assert.equal(utils.isObject(12), false);
});

test(`utils.isObject should return true when object value is passed`, function (assert) {
    assert.equal(utils.isObject({}), true);
});

test(`utils.isObject should return false when null is passed`, function (assert) {
    assert.equal(utils.isObject(null), false);
});

test(`utils.isCallable should return false when function value is not passed`, function (assert) {
    assert.equal(utils.isCallable(Math), false);
});

test(`utils.isCallable should return true when function value is passed`, function (assert) {
    assert.equal(utils.isCallable(Object), true);
});

test(`utils.isSameObjectContent should return false when keys length of two objects are not same`, function (assert) {
    assert.equal(
        utils.isSameObjectContent(
            { x: 10, y: 11},
            {x: 13}
        ),
        false
    );
});

test(`utils.isSameObjectContent should return false when two objects are not same in depth`, function (assert) {
    assert.equal(
        utils.isSameObjectContent(
            { obj: {x: 4, y: 5} },
            { obj: {x: 6, y: 7}}
        ),
        false
    );
});

test(`utils.isSameObjectContent should return true when two objects has same content`, function (assert) {
    assert.equal(
        utils.isSameObjectContent(
            { name: 'blah! blah!', obj: {x: 4, y: 5} },
            { name: 'blah! blah!', obj: {x: 4, y: 5}}
        ),
        true
    );
});

test(`utils.isUndefined should return true when undefined value is passed`, function (assert) {
    assert.equal(utils.isUndefined(undefined), true);
});

test(`utils.isUndefined should return false when non-undefined value is passed`, function (assert) {
    assert.equal(utils.isUndefined(12), false);
});

test(`utils.deepCopyOf should return a new cloned object of the specified one`, function (assert) {
    const obj = {
        x: 1,
        y: 2
    };
    assert.equal(utils.deepCopyOf(obj) === obj, false);
});