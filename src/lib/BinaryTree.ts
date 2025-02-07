class TreeNode {
    value: any; 
    left: TreeNode | null; 
    right: TreeNode | null; 
    subtags: string[]; 

    constructor(value: any) { 
        this.value = value;
        this.left = null;
        this.right = null;
        this.subtags = []; 
    }
}

class BinaryTree {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    insert(value: any, subtags: string[] = []) {
        const newNode = new TreeNode(value);
        newNode.subtags = subtags; 
        if (!this.root) {
            this.root = newNode;
            return;
        }
        this.insertNode(this.root, newNode);
    }

    insertNode(node: TreeNode, newNode: TreeNode) {
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    getNodes() {
        const nodes: { value: any; subtags: string[] }[] = [];
        this.traverse(this.root, nodes);
        return nodes;
    }

    traverse(node: TreeNode | null, nodes: { value: any; subtags: string[] }[]) {
        if (node) {
            nodes.push({ value: node.value, subtags: node.subtags });
            this.traverse(node.left, nodes);
            this.traverse(node.right, nodes);
        }
    }
}

export default BinaryTree; 