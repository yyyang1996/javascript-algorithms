import Node from './DoublyLinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class DoublyLinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  append(value) {
    const node = new Node(value, null, this.tail);
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
    const node = new Node(value, this.head);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.previous = node;
      this.head = node;
    }
    return this;
  }


  fromArray(arr) {
    arr.forEach((val) => {
      this.append(val);
    });
    return this;
  }

  delete(value) {
    let deleteNode = null;
    if (!this.head) {
      return deleteNode;
    }

    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head;
      this.head = this.head.next;
      if (this.head) {
        this.head.previous = null;
      }
    }

    let current = this.head;

    // 1, 1, 2, 3, 3, 3, 4, 5
    while (current && current.next) {
      if (this.compare.equal(current.next.value, value)) {
        deleteNode = current.next;
        const { next } = deleteNode;
        current.next = next;
        if (next) {
          next.previous = current;
        } else {
          this.tail = current;
          return deleteNode;
        }
      } else {
        current = current.next;
      }
    }

    if (current && this.compare.equal(current.value, value)) {
      deleteNode = current;
      this.tail = current.previous;
      if (this.tail) {
        this.tail.next = null;
      }
    }

    return deleteNode;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }

    if (this.head === this.tail) {
      const deleteNode = this.head;
      this.head = null;
      this.tail = null;
      return deleteNode;
    }

    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    const deleteNode = this.tail;
    this.tail = current.previous;
    if (this.tail) {
      this.tail.next = null;
    }

    return deleteNode;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    if (this.head === this.tail) {
      const deleteNode = this.head;
      this.head = null;
      this.tail = null;
      return deleteNode;
    }

    const deleteNode = this.head;
    this.head = this.head.next;
    if (this.head) {
      this.head.previous = null;
    }

    return deleteNode;
  }

  find({ value, callback }) {
    let current = this.head;

    while (current) {
      if (value && this.compare.equal(current.value, value)) {
        return current;
      } if (callback && callback(current.value, value)) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  reverse() {
    let current = this.head;

    while (current) {
      const nextNode = current.next;
      current.next = current.previous;
      current.previous = nextNode;
      current = nextNode;
    }

    const saved = this.tail;
    this.tail = this.head;
    this.head = saved;

    return this;
  }

  toString(callback) {
    const res = [];
    let current = this.head;
    while (current) {
      res.push(current.toString(callback));
      current = current.next;
    }

    return res.join(',');
  }
}
