export const HIGH_PRIORITY = 3;
export const MEDIUM_PRIORITY = 2;
export const LOW_PRIORITY = 1;

class Node {
  value: any;
  next: Node;
  priority: number;

  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
    this.next = null;
  }
}
export class PriorityQueue {
  root: Node;
  length: number;
  
  constructor() {
    this.root = null;
    this.length = 0;
  }

  insert(callbackFn, priority = LOW_PRIORITY) {
    const newNode = new Node(callbackFn, priority);
    if (!this.root || newNode.priority > this.root.priority) {
      newNode.next = this.root;
      this.root = newNode;
      this.length++;
      return;
    }
    let currentNode = this.root;
    while (currentNode.next && newNode.priority <= currentNode.next.priority) {
      currentNode = currentNode.next;
    }
    newNode.next = currentNode.next;
    currentNode.next = newNode;
    this.length++;
  }

  remove() {
    if (!this.root) {
      return null;
    }
    let rootNode = this.root;
    this.root = this.root.next;
    this.length--;
    return rootNode;
  }
}