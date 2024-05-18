INSERT INTO 
  `scenes` (`id`,`parentId`,`type`,`name`,`description`,`imageDescription`,`imagePath`,`createdAt`,`updatedAt`) 
VALUES 
  (1, 0,'location','起始之村','最初的起點。','Designed by photographeeasia / Freepik','images/village2.svg',NOW(),NOW()),
  (2, 1,'rest','旅館','來，給你最好的房間！','Designed by rawpixel.com / Freepik','images/inn.svg',NOW(),NOW()),
  (3, 1,'trade','市集','今天來要買甚麼？','Designed by designerhrenov Freepik','images/market.svg',NOW(),NOW()),
  (101, 1,'battleground','大草原','廣闊的草原。','Designed by Freepik','images/plateau.svg',NOW(),NOW()),
  (102, 101, 'battleground', '禮拜堂', '草原上神秘的一角。', 'Designed by Freepik', 'images/church.svg', NOW(), NOW()),
  (103, 101, 'battleground', '寧靜海岸', '通往未知的大陸', 'Designed by Freepik', 'images/lighthouse.svg', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `parentId` = VALUES(`parentId`),
  `type` = VALUES(`type`),
  `name` = VALUES(`name`),
  `description` = VALUES(`description`),
  `imageDescription` = VALUES(`imageDescription`),
  `imagePath` = VALUES(`imagePath`),
  `updatedAt` = VALUES(`updatedAt`),
  `createdAt` = VALUES(`createdAt`)
;

INSERT INTO
  `monsters` (`id`,`sceneId`, `name`,`experience`,`money`, `imagePath`, `imageDescription`,`createdAt`,`updatedAt`)
VALUES
  (1, 101, '飛龍', 50, 50, 'images/dragon.svg', 'Designed by macrovector / Freepik', NOW(), NOW()),
  (2, 101, '獨角獸', 50, 50, 'images/unicorn.svg', 'Designed by macrovector / Freepik', NOW(), NOW()),
  (3, 102, '天使', 60, 60, 'images/angel.svg', 'Designed by macrovector / Freepik', NOW(), NOW()),
  (4, 102, '獅鷲', 60, 60, 'images/griffin.svg', 'Designed by macrovector / Freepik', NOW(), NOW()),
  (5, 103, '人魚', 70, 70, 'images/mermaid.svg', 'Designed by macrovector / Freepik', NOW(), NOW()),
  (6, 103, '鳥妖', 70, 70, 'images/birdman.svg', 'Designed by macrovector / Freepik', NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `id` = VALUES(`id`),
  `name` = VALUES(`name`),
  `experience` = VALUES(`experience`),
  `money` = VALUES(`money`),
  `imagePath` = VALUES(`imagePath`),
  `imageDescription` = VALUES(`imageDescription`),
  `updatedAt` = VALUES(`updatedAt`),
  `createdAt` = VALUES(`createdAt`)
;

INSERT INTO
  `items` (`id`,`name`,`type`,`price`,`description`,`createdAt`,`updatedAt`)
VALUES
  (1, '生命藥水', 'consumable', 50, '回復100生命', NOW(), NOW()),
  (2, '魔力藥水', 'consumable', 50, '回復50魔力', NOW(), NOW()),
  (3, '不可思義之翼', 'consumable', 50, '瞬間移動到起始之村', NOW(), NOW()),
  (4, '銅劍', 'equipment', 100, '攻擊力+10', NOW(), NOW()),
  (5, '鐵劍', 'equipment', 200, '攻擊力+20', NOW(), NOW()),
  (6, '皮甲', 'equipment', 100, '防禦力+10', NOW(), NOW()),
  (7, '鐵甲', 'equipment', 200, '防禦力+20', NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `type` = VALUES(`type`),
  `price` = VALUES(`price`),
  `description` = VALUES(`description`),
  `updatedAt` = VALUES(`updatedAt`),
  `createdAt` = VALUES(`createdAt`)
;


INSERT INTO
  `merchants` (`id`,`name`, `sceneId`, `createdAt`,`updatedAt`)
VALUES
  (1, '雜貨店主', 3, NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `sceneId` = VALUES(`sceneId`),
  `updatedAt` = VALUES(`updatedAt`),
  `createdAt` = VALUES(`createdAt`)
;

INSERT INTO
  `users` (`id`, `username`, `password`, `createdAt`, `updatedAt`)
VALUES
  (1, 'apple', '$2b$10$FYgdGe7hgBxSa5283mdRq.EKSStAgNjVvP/ZSyyP50lZ9/XoDvn.y', NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `id` = VALUES(`id`),
  `username` = VALUES(`username`),
  `password` = VALUES(`password`),
  `updatedAt` = VALUES(`updatedAt`),
  `createdAt` = VALUES(`createdAt`)
;

INSERT INTO
  `characters` (`id`, `userId`, `currSceneId`, `name`, `profession`, `level`, `experience`, `nextLevelExp`, `money`, `isInBattle`, `createdAt`, `updatedAt`) 
VALUES 
  (1, 1, 1, 'Apple', 'mage', 1, 0, 100, 500, false, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `id` = VALUES(`id`),
  `userId` = VALUES(`userId`),
  `currSceneId` = VALUES(`currSceneId`),
  `name` = VALUES(`name`),
  `profession` = VALUES(`profession`),
  `level` = VALUES(`level`),
  `experience` = VALUES(`experience`),
  `nextLevelExp` = VALUES(`nextLevelExp`),
  `money` = VALUES(`money`),
  `isInBattle` = VALUES(`isInBattle`),
  `updatedAt` = VALUES(`updatedAt`),
  `createdAt` = VALUES(`createdAt`)
;

INSERT INTO `combat_attributes`
  (`id`, `currhp`, `currmp`, `maxhp`, `maxmp`, `power`, `agile`, `luck`, `attack`, `defence`, `skillSet`, `creatureId`, `creatureType`, `createdAt`, `updatedAt`) 
VALUES
  (1, 100, 50, 100, 50, 10, 10, 10, 10, 10, '1,2,3,4', 1, 'character', NOW(), NOW()),
  (2, 100, 20, 110, 20, 10, 10, 10, 20, 10, '1,2', 1, 'monster', NOW(), NOW()),
  (3, 120, 20, 120, 20, 10, 10, 10, 25, 15, '1,2', 2, 'monster', NOW(), NOW()),
  (4, 140, 20, 140, 20, 10, 10, 10, 40, 15, '1,2', 3, 'monster', NOW(), NOW()),
  (5, 150, 20, 150, 20, 10, 10, 10, 45, 20, '1,2', 4, 'monster', NOW(), NOW()),
  (6, 160, 20, 160, 20, 10, 10, 10, 50, 20, '1,2', 5, 'monster', NOW(), NOW()),
  (7, 170, 20, 170, 20, 10, 10, 10, 55, 25, '1,2', 6, 'monster', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `currhp` = VALUES(`currhp`),
  `currmp` = VALUES(`currmp`),
  `maxhp` = VALUES(`maxhp`),
  `maxmp` = VALUES(`maxmp`),
  `power` = VALUES(`power`),
  `agile` = VALUES(`agile`),
  `luck` = VALUES(`luck`),
  `attack` = VALUES(`attack`),
  `defence` = VALUES(`defence`),
  `skillSet` = VALUES(`skillSet`),
  `creatureId` = VALUES(`creatureId`),
  `creatureType` = VALUES(`creatureType`),
  `updatedAt` = VALUES(`updatedAt`),
  `createdAt` = VALUES(`createdAt`)
;

INSERT INTO `item_ownerships`
  (`id`,`itemId`, `ownerId`, `ownerType`, `quantity`, `equipped`, `createdAt`,`updatedAt`)
VALUES
  (1, 1, 1, 'merchant', 0, false, NOW(), NOW()),
  (2, 2, 1, 'merchant', 0, false, NOW(), NOW()),
  (3, 3, 1, 'merchant', 0, false, NOW(), NOW()),
  (4, 4, 1, 'merchant', 0, false, NOW(), NOW()),
  (5, 5, 1, 'merchant', 0, false, NOW(), NOW()),
  (6, 6, 1, 'merchant', 0, false, NOW(), NOW()),
  (7, 7, 1, 'merchant', 0, false, NOW(), NOW()),
  (8, 1, 1, 'monster', 0, false, NOW(), NOW()),
  (9, 2, 1, 'monster', 0, false, NOW(), NOW()),
  (10, 1, 2, 'monster', 0, false, NOW(), NOW()),
  (11, 2, 2, 'monster', 0, false, NOW(), NOW()),
  (12, 4, 3, 'monster', 0, false, NOW(), NOW()),
  (13, 6, 3, 'monster', 0, false, NOW(), NOW()),
  (14, 4, 4, 'monster', 0, false, NOW(), NOW()),
  (15, 6, 4, 'monster', 0, false, NOW(), NOW()),
  (16, 3, 5, 'monster', 0, false, NOW(), NOW()),
  (17, 5, 5, 'monster', 0, false, NOW(), NOW()),
  (18, 7, 5, 'monster', 0, false, NOW(), NOW()),
  (19, 3, 6, 'monster', 0, false, NOW(), NOW()),
  (20, 5, 6, 'monster', 0, false, NOW(), NOW()),
  (21, 7, 6, 'monster', 0, false, NOW(), NOW()),
  (22, 1, 1, 'character', 10, false, NOW(), NOW()),
  (23, 2, 1, 'character', 10, false, NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `id` = VALUES(`id`),
  `itemId` = VALUES(`itemId`),
  `ownerId` = VALUES(`ownerId`),
  `ownerType` = VALUES(`ownerType`),
  `quantity` = VALUES(`quantity`),
  `equipped` = VALUES(`equipped`),
  `updatedAt` = VALUES(`updatedAt`),
  `createdAt` = VALUES(`createdAt`)
;

INSERT INTO `skillbooks`
  (`id`,`name`, `type`, `description`, `skillCode`, `specialCode`,`timer`,`duration`,`cost`, `ATK`,`DEF`,`Power`,`Luck`,`Agile`, `createdAt`,`updatedAt`)
VALUES
  (1, "普攻", "attack", '無消耗、無加成', "Strike" ,"combine",5000, 0, 0, 5, 0,0,0,0, NOW(), NOW()),
  (2, "力劈", "attack", '力量加成', "Hack and slash", "repeat",3000, 0, 10, 10,0,10,0,0, NOW(), NOW()),
  (3, "突刺", "attack", '敏捷加成', "Swift Thrust", "repeat",3000, 0, 10, 10,0,0,0,10, NOW(), NOW()),
  (4, "全力一擊", "attack", '運氣加成', "FULL POWER", "repeat",3000, 0, 20,20,0,0,10,0, NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `type` = VALUES(`type`),
  `description` = VALUES(`description`),
  `skillCode` = VALUES(`skillCode`),
  `specialCode` = VALUES(`specialCode`),
  `duration` = VALUES(`duration`),
  `cost` = VALUES(`cost`),
  `ATK` = VALUES(`ATK`),
  `DEF` = VALUES(`DEF`),
  `Power` = VALUES(`Power`),
  `Luck` = VALUES(`Luck`),
  `Agile` = VALUES(`Agile`),
  `timer` = VALUES(`timer`),
  `updatedAt` = VALUES(`updatedAt`)
;

INSERT INTO
  `equipment_attributes` (`id`, `itemId`, `bodypart`, `maxhp`, `maxmp`,`power`,`agile`,`luck`,`attack`,`defence`,`createdAt`,`updatedAt`)
VALUES
  (1, 4, 'weapon', 0, 0, 0, 0, 0, 10, 0, NOW(), NOW()),
  (2, 5, 'weapon', 0, 0, 0, 0, 0, 20, 0, NOW(), NOW()),
  (3, 6, 'body', 0, 0, 0, 0, 0, 0, 10, NOW(), NOW()),
  (4, 7, 'body', 0, 0, 0, 0, 0, 0, 20, NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `id` = VALUES(`id`),
  `itemId` = VALUES(`itemId`),
  `bodypart` = VALUES(`bodypart`),
  `maxhp` = VALUES(`maxhp`),
  `maxmp` = VALUES(`maxmp`),
  `power` = VALUES(`power`),
  `agile` = VALUES(`agile`),
  `luck` = VALUES(`luck`),
  `attack` = VALUES(`attack`),
  `defence` = VALUES(`defence`),
  `updatedAt` = VALUES(`updatedAt`),
  `createdAt` = VALUES(`createdAt`)
;