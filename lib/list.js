function None() {
  return null
}

function Cons(val, next) {
  return new _Cons(val, next)
}

function _Cons(val, next) {
  this.val = val
  this.next = next
}
_Cons.prototype.pattern = function() {
  return [this.val, this.next]
}

function List(...args) {
  if (args.length === 0) {
    return None()
  }
  const head = args[0]
  const tail = args.slice(1)
  return Cons(head, List(...tail))
}

const sum = (ns) => foldRight(ns, 0, (x,y) => x + y)
const product = (ns) => foldRight(ns, 1, (x, y) => x * y)
const append = (a1, a2) => foldRight(a1, a2, (x, y) => Cons(x, y))

const foldRight = (l, z, fn) => {
  if (l === null) {
    return z
  }
  const [x, xs] = l.pattern()
  return fn(x, foldRight(xs, z, fn))
}

const assert = require('assert').strict;

var list1 = List(1,2,3)
var list2 = List(10,20,30)
assert.equal(sum(list1), 6)
assert.equal(sum(list2), 60)
assert.equal(product(list1), 6)
assert.equal(product(list2), 6000)
assert.equal(append(list1, list2).val, 1)
assert.equal(append(list1, list2).next.val, 2)
assert.equal(append(list1, list2).next.next.val, 3)
assert.equal(append(list1, list2).next.next.next.val, 10)
assert.equal(append(list1, list2).next.next.next.next.val, 20)
assert.equal(append(list1, list2).next.next.next.next.next.val, 30)
assert.equal(append(list1, list2).next.next.next.next.next.next, null)

module.exports.List = List
module.exports.sum = sum
module.exports.product = product
module.exports.append = append
