export default class DoublyLinkedListNode {
  constructor(value, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.previous = prev;
  }

  toString(callback) {
    return callback ? callback(this.value) : this.value.toString();
  }
}
