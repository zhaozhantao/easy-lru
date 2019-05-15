"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EasyLru = /** @class */ (function () {
    function EasyLru(maxSize, removeCb) {
        this.key2node = {};
        this.curSize = 0;
        this.maxSize = maxSize;
        this.removeCb = removeCb;
        this.headNode = new Node();
        this.endNode = new Node();
        this.headNode.nextNode = this.endNode;
        this.endNode.preNode = this.headNode;
    }
    EasyLru.prototype.use = function (key, size) {
        var node = this.key2node[key];
        if (node) {
            this.removeNode(node);
        }
        else {
            node = new Node();
            node.key = key;
            this.key2node[key] = node;
        }
        node.size = size;
        this.headNode.nextNode.preNode = node;
        node.nextNode = this.headNode.nextNode;
        node.preNode = this.headNode;
        this.headNode.nextNode = node;
        this.curSize += size;
        if (this.curSize > this.maxSize) {
            this.autoRemoveBySize();
        }
    };
    EasyLru.prototype.remove = function (key) {
        var node = this.key2node[key];
        if (node) {
            this.removeNode(node);
        }
        delete this.key2node[key];
    };
    EasyLru.prototype.removeNode = function (node) {
        node.preNode.nextNode = node.nextNode;
        node.nextNode.preNode = node.preNode;
        this.curSize -= node.size;
    };
    EasyLru.prototype.autoRemoveBySize = function () {
        while (this.curSize > this.maxSize && this.endNode.preNode && this.endNode.preNode !== this.headNode) {
            var lastNode = this.endNode.preNode;
            var lastKey = lastNode.key;
            this.removeNode(lastNode);
            delete this.key2node[lastKey];
            this.removeCb(lastKey);
        }
    };
    return EasyLru;
}());
exports.default = EasyLru;
var Node = /** @class */ (function () {
    function Node() {
        this.size = 0;
    }
    return Node;
}());
