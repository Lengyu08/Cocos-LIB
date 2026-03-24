import { Node, UITransform, Vec2, Vec3, view } from 'cc';

/**
 * PositionUtils is a utility class for handling node positions
 */
export class PositionUtils {
    /**
     * Convert the coordinates of the "from" node to those of the "to" node (between different nodes) ( 2D )
     */
    public static positionToTarget(from: Node, to: Node): Vec3 {
        const localPos = new Vec3();
        const worldPos = from.getWorldPosition();
        to.inverseTransformPoint(localPos, worldPos);
        return localPos;
    }

    /**
     * Try to move the node by the delta ( 2D )
     * if it will fly out of the visible area
     * it will not move and return false
     * Note : 
     * * ( 1 ) if it doesn't work, you need to run it once in Cocos Create to let the browser change the visible size of the node
     */
    public static tryMoveInVisibleArea(node: Node, delta: Vec2 | Vec3): boolean {
        const uiTransform = node.getComponent(UITransform);
        if (!uiTransform) return false;

        const currentPos = node.position;

        const targetX = currentPos.x + delta.x;
        const targetY = currentPos.y + delta.y;

        if (this.isOutOfVisibleArea(node, targetX, targetY)) {
            return false;
        }

        node.setPosition(targetX, targetY);
        return true;
    }

    /**
     * check if the node will fly out of the visible area at the passed position ( 2D )
     * Note : 
     * * ( 1 ) if it doesn't work, you need to run it once in Cocos Create to let the browser change the visible size of the node
     */
    public static isOutOfVisibleArea (
        node: Node,
        targetX: number,
        targetY: number
    ): boolean {
        const uiTransform = node.getComponent(UITransform);
        if (!uiTransform) return true;

        const visibleSize = view.getVisibleSize();

        const halfNodeWidth = uiTransform.width * Math.abs(node.scale.x) / 2;
        const halfNodeHeight = uiTransform.height * Math.abs(node.scale.y) / 2;

        const halfScreenWidth = visibleSize.width / 2;
        const halfScreenHeight = visibleSize.height / 2;

        const minX = -halfScreenWidth + halfNodeWidth;
        const maxX = halfScreenWidth - halfNodeWidth;
        const minY = -halfScreenHeight + halfNodeHeight;
        const maxY = halfScreenHeight - halfNodeHeight;

        return targetX < minX || targetX > maxX || targetY < minY || targetY > maxY;
    }
}