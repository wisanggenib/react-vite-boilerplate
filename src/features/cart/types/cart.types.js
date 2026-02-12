/**
 * Cart types (JSDoc)
 *
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} productId
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 * @property {string} image
 */

export const CART_ACTIONS = {
    ADD: 'ADD_ITEM',
    REMOVE: 'REMOVE_ITEM',
    UPDATE_QTY: 'UPDATE_QUANTITY',
    CLEAR: 'CLEAR_CART',
}
