import { Node, UITransform, Vec2, Vec3, view, screen, sys } from 'cc';

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
     * if it will fly out of the view area
     * it will not move and return false
     * @returns true if the node is moved successfully, false if the node will fly out of the view area and is not moved
     */
    public static tryMoveInViewArea ( 
        node: Node, 
        delta: Vec2 | Vec3,
        isFullObject: boolean
    ): boolean {
        const uiTransform = node.getComponent(UITransform);
        if (!uiTransform) {
            console.warn('Node does not have UITransform component');
            return false;
        }

        const currentPos = node.position;

        const targetX = currentPos.x + delta.x;
        const targetY = currentPos.y + delta.y;

        if (this.isOutOfViewArea(node, targetX, targetY, isFullObject)) {
            return false;
        }

        node.setPosition(targetX, targetY);
        return true;
    }

    /**
     * Check if the target position is out of the view area
     * @returns true if the target position is out of the view area, false if the target position is within the view area
     */
    public static isOutOfViewArea(
        node: Node,
        targetX: number,
        targetY: number,
        isFullObject: boolean
    ): boolean {
        const uiTransform = node.getComponent(UITransform);
        if (!uiTransform) {
            console.warn('Node does not have UITransform component');
            return true;
        }

        const viewSize = view.getVisibleSize();
        
        const halfNodeWidth = uiTransform.width * Math.abs(node.scale.x) / 2;
        const halfNodeHeight = uiTransform.height * Math.abs(node.scale.y) / 2;

        const halfScreenWidth = viewSize.width / 2;
        const halfScreenHeight = viewSize.height / 2;

        if (!isFullObject) {
            return targetX < -halfScreenWidth || targetX > halfScreenWidth || targetY < -halfScreenHeight || targetY > halfScreenHeight;
        }

        const minX = -halfScreenWidth + halfNodeWidth;
        const maxX = halfScreenWidth - halfNodeWidth;
        const minY = -halfScreenHeight + halfNodeHeight;
        const maxY = halfScreenHeight - halfNodeHeight;

        return targetX < minX || targetX > maxX || targetY < minY || targetY > maxY;
    }
}