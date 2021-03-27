/**
 * Hash used to shift encrypted keys
 */
const hash = [
    0x37, 0x3, 0xAA, 0x20, /** 0x20AA0337 */
    0x41, 0x1B, 0x9, 0x80, /** 0x7FF6E4BF */
    0x2B, 0x2, 0x36, 0x40, /** 0x4036022B */
    0x4, 0xA, 0x9, 0x2B /** 0x2B090A04 */
];

/**
 * Returns a shifted version of the given key
 * @param {Array} key 
 */

module.exports = key => {
    var result = [];

    var last, current,
        mask = (current = key[0]) + 4 & 7;

    result.push(last = hash[0] ^ (current << mask | current >>> 8 - mask) & 0xff);

    for (var i = 1; i < 8; i++) {
        mask = (current = key[i]) + 4 & 7;
        result.push(last = (current << mask | current >>> 8 - mask) & 0xff ^ last ^ hash[i]);
    }

    for (var i = 0; i < 3; i++)
        result.push(key[i]);

    result.push(result[3]);
    result.push(key[0] ^ key[7] & -0x20)

    return result;
}
