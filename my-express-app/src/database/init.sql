INSERT INTO 
  `scenes` (`id`,`parentId`,`type`,`name`,`description`,`imageDescription`,`imagePath`,`createdAt`,`updatedAt`) 
VALUES 
  (1, 0,'location','起始之村','最初的起點。','Designed by photographeeasia / Freepik','images/village2.svg',NOW(),NOW()),
  (2, 1,'rest','旅館','這不就是Apple嗎，今天來要做甚麼？','Designed by rawpixel.com / Freepik','images/inn.svg',NOW(),NOW()),
  (3, 1,'trade','市集','這裡有各種武器和防具，你可以在這裡購買或賣出裝備。','Designed by designerhrenov Freepik','images/market.svg',NOW(),NOW()),
  (4, 1,'location','公會','這裡可以存錢，你可以在這裡存取金錢。','Designed by macrovector_official / Freepik','images/guild.svg',NOW(),NOW()),
  (5, 1,'location','教會','這裡是一個神聖的地方，你可以在這裡恢復生命值。','Designed by rawpixel.com / Freepik','images/church.svg',NOW(),NOW()),
  (6, 1,'location','村長家','這裡是村長的家，你可以在這裡接受任務。','Designed by Freepik','images/elder.svg',NOW(),NOW()),
  (7, 1,'battleground','大草原','這裡是一片廣闊的草原，你可以在這裡找到各種野生動物。','Designed by Freepik','images/plateau.svg',NOW(),NOW()),
  (8, 7,'event','古樹','一位旅人在樹蔭下休息。','Designed by rawpixel.com ／ Freepik','images/oldtree.svg',NOW(),NOW()),
  (101, 0,'victory','勝利','獲得831EXP、1199G、龍角！','Designed by b0red / pixabay','images/treasure.svg',NOW(),NOW()),
  (201, 7,'monster','上古飛龍','這是一隻上古飛龍，它的攻擊力和防禦力都很高，要小心！','Designed by macrovector / Freepik','images/dragon.svg',NOW(),NOW()),
  (202, 7,'monster','獨角獸','迷惑的看著你。','Designed by macrovector / Freepik','images/unicorn.svg',NOW(),NOW())
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
  `items` (`id`,`name`,`type`,`price`,`description`,`createdAt`,`updatedAt`)
VALUES
  (1, '生命藥水', 'consumable', 50, '回復生命', NOW(), NOW()),
  (2, '魔力藥水', 'consumable', 50, '回復魔力', NOW(), NOW())
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
  `characters` (`id`, `name`, `profession`, `level`, `experience`, `money`, `equipmentWeaponId`, `equipmentBodyId`, `createdAt`, `updatedAt`) 
VALUES 
  (1, 'Apple', 'mage', 1, 0, 1000, 1, 2, NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  `name` = VALUES(`name`),
  `profession` = VALUES(`profession`),
  `level` = VALUES(`level`),
  `experience` = VALUES(`experience`),
  `money` = VALUES(`money`),
  `equipmentWeaponId` = VALUES(`equipmentWeaponId`),
  `equipmentBodyId` = VALUES(`equipmentBodyId`),
  `updatedAt` = VALUES(`updatedAt`),
  `createdAt` = VALUES(`createdAt`)
;

INSERT INTO `combat_attributes`
  (`id`, `currhp`, `currmp`, `maxhp`, `maxmp`, `power`, `agile`, `luck`, `attack`, `defence`, `skillSet`, `creatureId`, `creatureType`, `createdAt`, `updatedAt`) 
VALUES
  (1, 100, 20, 100, 20, 10, 10, 10, 10, 10, '[1,2]', 1, 'character', NOW(), NOW())
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
  (`id`,`itemId`, `ownerId`, `ownerType`, `quantity`, `createdAt`,`updatedAt`)
VALUES
  (1, 1, 1, 'merchant', 0, NOW(), NOW()),
  (2, 2, 1, 'merchant', 0, NOW(), NOW()),
  (3, 1, 1, 'character', '10', NOW(), NOW()),
  (4, 2, 1, 'character', '10', NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `id` = VALUES(`id`),
  `itemId` = VALUES(`itemId`),
  `ownerId` = VALUES(`ownerId`),
  `ownerType` = VALUES(`ownerType`),
  `quantity` = VALUES(`quantity`),
  `updatedAt` = VALUES(`updatedAt`),
  `createdAt` = VALUES(`createdAt`)
;
INSERT INTO `skillbooks`
  (`id`,`name`, `type`, `description`, `skillCode`, `specialCode`,`duration`,`ATK`,`DEF`,`Power`,`Luck`,`Agile`, `createdAt`,`updatedAt`)
VALUES
  (1, "normal attack", "attack", 'kick, puch and slap!', "kick", "combine",  0,10,0,0,0,0, NOW(), NOW()),
  (2, "normal defense", "defense", 'protect yourself!', "defense", "repeat", 3,0,10,0,0,-10, NOW(), NOW()),
  (3, "fire ball",  "magic", 'what else should i explain?', "fireBall","none", 1,15,0,0,10,0, NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `type` = VALUES(`type`),
  `description` = VALUES(`description`),
  `skillCode` = VALUES(`skillCode`),
  `specialCode` = VALUES(`specialCode`),
  `duration` = VALUES(`duration`),
  `ATK` = VALUES(`ATK`),
  `DEF` = VALUES(`DEF`),
  `Power` = VALUES(`Power`),
  `Luck` = VALUES(`Luck`),
  `Agile` = VALUES(`Agile`),
  `updatedAt` = VALUES(`updatedAt`)
;