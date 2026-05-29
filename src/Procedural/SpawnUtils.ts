import { Node, UITransform, Vec3, random } from 'cc';

/**
 * Utility methods for generating spawn positions.
 */
export class SpawnUtils {
    /**
     * Returns a random index based on the given weight array.
     *
     * Example:
     * [50, 30, 20] -> index 0 has 50% weight, index 1 has 30%, index 2 has 20%
     *
     * Notes:
     * - The weights do NOT need to sum to 100.
     * - All weights must be >= 0.
     * - If all weights are 0, returns -1.
     *
     * @param weights A number array representing probabilities/weights.
     * @returns The selected random index, or -1 if invalid.
     */
    public static getRandomIndexByWeights(weights: number[]): number {
        if (!weights || weights.length === 0) {
            console.warn('[SpawnUtils] weights is empty.');
            return -1;
        }

        // Compute total weight
        let totalWeight = 0;
        for (let i = 0; i < weights.length; i++) {
            const weight = weights[i];
            if (!Number.isFinite(weight) || weight < 0) {
                console.warn(`[SpawnUtils] Invalid weight at index ${i}: ${weight}`);
                return -1;
            }
            totalWeight += weight;
        }

        if (totalWeight <= 0) {
            console.warn('[SpawnUtils] Total weight must be greater than 0.');
            return -1;
        }

        // Generate a random number in the range [0, totalWeight)
        const rand = random() * totalWeight;

        let current = 0;
        for (let i = 0; i < weights.length; i++) {
            current += weights[i];
            if (rand < current) return i;
        }

        // Floating-point safety fallback
        return weights.length - 1;
    }
    
    /**
     * Returns a random spawn center point above or below the given line segment
     * The returned position is in the local coordinate space of node.parent
     * so it can be used directly with node.setPosition(...).
     *
     * The random point is chosen from a shortened version of the original line segment,
     * so large nodes are less likely to spawn too close to the segment ends.
     * The parent node must be a canvas or screen, and must be located at the origin (0,0).
     *
     * @param node The node to spawn. Its size and scale are used to account for its volume.
     * @param start The start point of the line segment, in the same coordinate space as node.parent.
     * @param end The end point of the line segment, in the same coordinate space as node.parent.
     * @param side Which side of the line to spawn on: 'up', 'down', or 'random'.
     * @param minDistance The minimum extra distance from the line.
     * @param maxDistance The maximum extra distance from the line.
     * @param edgePadding Extra padding applied to both ends of the line segment.
     * @returns A random center position for spawning the node.
     */
    public static getRandomSpawnCenterAroundLine (
        node: Node,
        start: Vec3,
        end: Vec3,
        side: 'up' | 'down' | 'random' = 'random',
        minDistance = 20,
        maxDistance = 80,
        edgePadding = 0
    ): Vec3 {
        const uiTransform = node.getComponent(UITransform);
        if (!uiTransform) {
            console.warn('[SpawnUtils] Node does not have a UITransform component.');
            return start.clone();
        }

        // Compute the direction and length of the line segment.
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        // Pythagorean theorem ( for right triangles a ^ 2 + b ^ 2 = c ^ 2 )
        const len = Math.sqrt(dx * dx + dy * dy);

        // If start and end are too close, return the start point.
        if (len <= 0.0001) return start.clone();

        // normalize the line segment to obtain a unit direction vector
        const dirX = dx / len;
        const dirY = dy / len;

        let normalX = 0;
        let normalY = 0;
        switch (side) {
            case 'up':
                normalX = -dirY;
                normalY = dirX;
                break;
            case 'down':    
                normalX = dirY;
                normalY = -dirX;    
                break;
            case 'random':
                const useUpSide = random() < 0.5;
                if (useUpSide) {
                    normalX = -dirY;
                    normalY = dirX;
                } else {
                    normalX = dirY;
                    normalY = -dirX;
                }
                break;
            default:
                console.warn(`[SpawnUtils] Invalid side parameter: ${side}. Defaulting to 'random'.`);
        }

        // Consider node size
        const halfWidth = (uiTransform.width * Math.abs(node.scale.x)) / 2;
        const halfHeight = (uiTransform.height * Math.abs(node.scale.y)) / 2;

        // Project the node's half extents onto the normal direction, ensures the full node stays on the selected side of the line.
        const projectedRadiusOnNormal = Math.abs(normalX) * halfWidth + Math.abs(normalY) * halfHeight;

        // Project the node's half extents onto the line direction, shorten the usable line segment near both ends.
        const projectedRadiusOnLine = Math.abs(dirX) * halfWidth + Math.abs(dirY) * halfHeight;

        // Shorten the line segment at both ends so large nodes do not spawn too close to the edges.
        const shortenAmount = projectedRadiusOnLine + edgePadding;
        const usableLength = len - shortenAmount * 2;

        // If the line is too short after shrinking, fall back to the midpoint.
        let pointOnLine: Vec3;
        if (usableLength <= 0) {
            pointOnLine = new Vec3(
                (start.x + end.x) * 0.5,
                (start.y + end.y) * 0.5,
                (start.z + end.z) * 0.5
            );
        } else {
            const t = random();
            const offsetAlongLine = shortenAmount + usableLength * t;

            pointOnLine = new Vec3(
                start.x + dirX * offsetAlongLine,
                start.y + dirY * offsetAlongLine,
                start.z + (end.z - start.z) * ((offsetAlongLine / len))
            );
        }

        // Add an extra random offset away from the line.
        const extraOffset = minDistance + (maxDistance - minDistance) * random();
        const totalOffset = projectedRadiusOnNormal + extraOffset;

        // Return the final spawn center point.
        return new Vec3 (
            pointOnLine.x + normalX * totalOffset,
            pointOnLine.y + normalY * totalOffset,
            pointOnLine.z
        );
    }
}