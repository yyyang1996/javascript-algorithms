import LinkedList from '../linked-list/LinkedList';

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.linkedList.head;
  }

  /**
   * @return {*}
   */
  peek() {
    const node = this.linkedList.tail;
    return node ? node.value : null;
  }

  /**
   * @param {*} value
   */
  push(value) {
    return this.linkedList.append(value);
  }

  /**
   * @return {*}
   */
  pop() {
    const node = this.linkedList.deleteTail();
    return node ? node.value : null;
  }

  /**
   * @return {*[]}
   */
  toArray() {
    const arr = [];
    while (!this.isEmpty()) {
      arr.push(this.pop());
    }
    return arr;
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    this.linkedList.reverse();
    const res = this.linkedList.toString(callback);
    this.linkedList.reverse();
    return res;
  }
}
