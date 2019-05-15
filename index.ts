export default class EasyLru {
    private removeCb: (key: string) => void;
    private maxSize: number;
    private key2node : {[key:string]:Node} = {};
    private headNode : Node;
    private endNode : Node;
    private curSize : number = 0;

    constructor(maxSize:number, removeCb:(key:string)=>void) {
        this.maxSize = maxSize;
        this.removeCb = removeCb;
        this.headNode = new Node();
        this.endNode = new Node();
        this.headNode.nextNode = this.endNode;
        this.endNode.preNode = this.headNode;
    }
    use(key:string, size:number):void {
        let node = this.key2node[key];
        if (node) {
            this.removeNode(node);
        } else {
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
    }
    remove(key:string) {
        let node = this.key2node[key];
        if (node) {
            this.removeNode(node);
        }
        delete this.key2node[key];
    }    

    private removeNode(node:Node) {
        node.preNode.nextNode = node.nextNode;
        node.nextNode.preNode = node.preNode;
        this.curSize -= node.size;
    }
    private autoRemoveBySize() {
        while (this.curSize > this.maxSize && this.endNode.preNode && this.endNode.preNode !== this.headNode) {
            let lastNode = this.endNode.preNode;
            let lastKey = lastNode.key;
            this.removeNode(lastNode);
            delete this.key2node[lastKey];
            this.removeCb(lastKey);
        }
    }
}
class Node {
    key !: string;
    preNode !: Node;
    nextNode !: Node;
    size : number = 0;
}