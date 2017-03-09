import { TreeElement } from './treeElement';
import { TreeLeaf } from './treeLeaf';

export interface TreeNode extends TreeLeaf {
    children: TreeElement[];
}
