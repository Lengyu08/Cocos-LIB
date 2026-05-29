# Cocos-LIB
A lightweight TypeScript extension library for Cocos


```
Cocos-Lib/
├── core/                         // 基础层：通用、不依赖具体玩法
│   ├── constants/
│   │   ├── MathConst.ts
│   │   ├── GameConst.ts
│   │   └── UIConst.ts
│   ├── types/
│   │   ├── CommonTypes.ts
│   │   ├── MathTypes.ts
│   │   └── PathTypes.ts
│   ├── interfaces/
│   │   ├── IPoolable.ts
│   │   ├── IMovable.ts
│   │   └── IState.ts
│   ├── enums/
│   │   ├── DirectionEnum.ts
│   │   ├── EasingEnum.ts
│   │   └── CollisionEnum.ts
│   └── utils/
│       ├── AssertUtils.ts
│       ├── DebugUtils.ts
│       ├── RandomUtils.ts
│       ├── TimeUtils.ts
│       ├── StringUtils.ts
│       ├── NumberUtils.ts
│       └── ObjectUtils.ts
│
├── math/                         // 数学算法
│   ├── MathUtils.ts
│   ├── AngleUtils.ts
│   ├── Vector2Utils.ts
│   ├── Vector3Utils.ts
│   ├── MatrixUtils.ts
│   ├── GeometryUtils.ts
│   ├── InterpolationUtils.ts
│   ├── CurveUtils.ts
│   ├── EasingUtils.ts
│   ├── NoiseUtils.ts
│   └── ProbabilityUtils.ts
│
├── transform/                    // 坐标、位移、旋转、缩放相关
│   ├── PositionUtils.ts
│   ├── RotationUtils.ts
│   ├── ScaleUtils.ts
│   ├── TransformUtils.ts
│   ├── CoordinateUtils.ts
│   ├── ScreenUtils.ts
│   ├── CameraUtils.ts
│   └── AnchorUtils.ts
│
├── motion/                       // 运动算法
│   ├── MoveUtils.ts
│   ├── FollowUtils.ts
│   ├── SeekUtils.ts
│   ├── SteeringUtils.ts
│   ├── OrbitUtils.ts
│   ├── BounceUtils.ts
│   ├── PatrolUtils.ts
│   ├── ProjectileUtils.ts
│   ├── BallisticUtils.ts
│   └── TweenMotionUtils.ts
│
├── collision/                    // 碰撞与空间判断
│   ├── CollisionUtils.ts
│   ├── RectCollisionUtils.ts
│   ├── CircleCollisionUtils.ts
│   ├── PolygonCollisionUtils.ts
│   ├── RaycastUtils.ts
│   ├── OverlapUtils.ts
│   ├── BoundsUtils.ts
│   └── SpatialPartitionUtils.ts
│
├── pathfinding/                  // 寻路与导航
│   ├── AStar.ts
│   ├── BFS.ts
│   ├── DFS.ts
│   ├── GridUtils.ts
│   ├── NavigationUtils.ts
│   ├── WaypointUtils.ts
│   ├── FlowFieldUtils.ts
│   └── PathSmoothUtils.ts
│
├── ai/                           // 常见游戏 AI 算法
│   ├── FSM/
│   │   ├── StateMachine.ts
│   │   ├── State.ts
│   │   └── StateTransition.ts
│   ├── BT/
│   │   ├── BehaviorTree.ts
│   │   ├── BTNode.ts
│   │   ├── Selector.ts
│   │   ├── Sequence.ts
│   │   ├── Condition.ts
│   │   └── Action.ts
│   ├── DecisionUtils.ts
│   ├── ThreatUtils.ts
│   ├── AggroUtils.ts
│   ├── TargetSelectUtils.ts
│   └── FormationUtils.ts
│
├── combat/                       // 战斗常见算法
│   ├── DamageUtils.ts
│   ├── CritUtils.ts
│   ├── HitUtils.ts
│   ├── SkillRangeUtils.ts
│   ├── KnockbackUtils.ts
│   ├── BulletPatternUtils.ts
│   ├── BuffUtils.ts
│   ├── CooldownUtils.ts
│   └── ComboUtils.ts
│
├── procedural/                   // 程序化生成
│   ├── SpawnUtils.ts             
│   ├── LootUtils.ts
│   ├── WaveUtils.ts
│   ├── DungeonUtils.ts
│   ├── MapGenUtils.ts
│   ├── MazeUtils.ts
│   ├── PatternGenUtils.ts
│   └── TerrainNoiseUtils.ts
│
├── ui/                           // UI 常见算法
│   ├── UIPositionUtils.ts
│   ├── UILayoutUtils.ts
│   ├── SafeAreaUtils.ts
│   ├── ScrollUtils.ts
│   ├── DragUtils.ts
│   ├── RedPointUtils.ts
│   ├── ProgressUtils.ts
│   ├── NumberRollUtils.ts
│   └── AdaptationUtils.ts
│
├── animation/                    // 动画与表现算法
│   ├── ShakeUtils.ts
│   ├── FlashUtils.ts
│   ├── CurveAnimationUtils.ts
│   ├── FrameAnimUtils.ts
│   ├── IKUtils.ts
│   └── TrailUtils.ts
│
├── map/                          // 地图和格子逻辑
│   ├── TileMapUtils.ts
│   ├── GridCoordUtils.ts
│   ├── HexGridUtils.ts
│   ├── IsoGridUtils.ts
│   ├── FogOfWarUtils.ts
│   └── RegionUtils.ts
│
├── economy/                      // 数值和经济系统常见算法
│   ├── GrowthUtils.ts
│   ├── CostUtils.ts
│   ├── RewardUtils.ts
│   ├── CurrencyUtils.ts
│   ├── DropRateUtils.ts
│   └── GachaUtils.ts
│
├── data_struct/                         // 数据结构与高频通用算法
│   ├── Heap.ts
│   ├── PriorityQueue.ts
│   ├── Queue.ts
│   ├── Stack.ts
│   ├── LinkedList.ts
│   ├── Graph.ts
│   ├── UnionFind.ts
│   ├── KDTree.ts
│   └── QuadTree.ts
│
├── optimization/                 // 性能优化相关
│   ├── ObjectPool.ts
│   ├── NodePoolUtils.ts
│   ├── CullingUtils.ts
│   ├── BatchUtils.ts
│   ├── VisibilityUtils.ts
│   └── LODUtils.ts
│
├── gameplay/                     // 常见玩法模板算法
│   ├── Match/
│   │   ├── Match3Utils.ts
│   │   ├── GridFallUtils.ts
│   │   └── ComboDetectUtils.ts
│   ├── TowerDefense/
│   │   ├── TowerTargetUtils.ts
│   │   ├── RouteUtils.ts
│   │   └── TowerRangeUtils.ts
│   ├── Roguelike/
│   │   ├── RoomConnectUtils.ts
│   │   ├── MonsterSpawnUtils.ts
│   │   └── RelicUtils.ts
│   ├── Card/
│   │   ├── DeckUtils.ts
│   │   ├── ShuffleUtils.ts
│   │   └── HandLayoutUtils.ts
│   └── Shooter/
│       ├── EnemySpawnUtils.ts
│       ├── BulletHellUtils.ts
│       └── AutoAimUtils.ts
│
├── extensions/                   // 对 Cocos 原生类型的扩展封装
│   ├── NodeExtensions.ts
│   ├── VecExtensions.ts
│   ├── UITransformExtensions.ts
│   └── ComponentExtensions.ts
│
├── tests/                        // 算法测试
│   ├── math/
│   ├── collision/
│   ├── pathfinding/
│   └── combat/
│
├── examples/                     // 示例代码
│   ├── movement/
│   ├── bullet/
│   ├── pathfinding/
│   ├── ui/
│   └── procedural/
│
├── index.ts                      // 统一导出
└── README.md
```