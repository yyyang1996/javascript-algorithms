import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

class LinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }

  append(value) {
    const node = new LinkedListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    return this;
  }

  prepend(value) {
    const node = new LinkedListNode(value, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    return this;
  }

  delete(value) {
    let deleteNode = null;
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.deleteHead();
    }

    let current = this.head;

    if (current) {
      while (current.next) {
        if (this.compare.equal(current.next.value, value)) {
          deleteNode = current.next;
          current.next = current.next.next;
        } else {
          current = current.next;
        }
      }
    }

    if (this.tail && this.compare.equal(this.tail.value, value)) {
      deleteNode = this.tail;
      this.tail = current;
    }
    return deleteNode;
  }

  deleteHead() {
    if (this.head === this.tail) {
      const deleteNode = this.head;
      this.head = null;
      this.tail = null;
      return deleteNode;
    }

    const deleteNode = this.head;
    this.head = this.head.next;

    return deleteNode;
  }

  deleteTail() {
    if (this.head === this.tail) {
      const deleteNode = this.tail;
      this.head = null;
      this.tail = null;
      return deleteNode;
    }

    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }

    const deleteNode = this.tail;

    this.tail = current;
    current.next = null;

    return deleteNode;
  }

  reverse() {
    if (!this.head || this.head === this.tail) {
      return;
    }

    let prev = null;
    let current = this.head;


    while (current) {
      const { next } = current;
      current.next = prev;
      prev = current;
      current = next;
    }

    const { head } = this;
    const { tail } = this;
    this.tail = head;
    this.head = tail;
  }

  toString(nodeStringifier) {
    const res = [];
    let current = this.head;

    while (current) {
      res.push(current.toString(nodeStringifier));
      current = current.next;
    }

    return res.join(',');
  }

  fromArray(arr) {
    arr.forEach((val) => {
      this.append(val);
    });
  }

  find({ value, callback }) {
    let current = this.head;

    while (current) {
      if (value) {
        if (this.compare.equal(current.value, value)) {
          return current;
        }
      } else if (callback) {
        if (callback(current.value)) {
          return current;
        }
      }
      current = current.next;
    }

    return null;
  }
}

export default LinkedList;
