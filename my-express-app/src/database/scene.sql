INSERT INTO `scenes` (`id`,`parentId`,`type`,`name`,`description`,`imageDescription`,`imagePath`,`createdAt`,`updatedAt`) 
VALUES 
(DEFAULT, 0,'location','起始之村','最初的起點。','Designed by photographeeasia / Freepik','images/village2.svg',NOW(),NOW()),
(DEFAULT, 1,'location','旅館','這不就是Apple嗎，今天來要做甚麼？','Designed by rawpixel.com / Freepik','images/inn.svg',NOW(),NOW()),
(DEFAULT, 1,'location','市集','這裡有各種武器和防具，你可以在這裡購買或賣出裝備。','Designed by designerhrenov Freepik','images/market.svg',NOW(),NOW()),
(DEFAULT, 1,'location','銀行','這裡可以存錢，你可以在這裡存取金錢。','Designed by rawpixel.com / Freepik','images/bank.svg',NOW(),NOW()),
(DEFAULT, 1,'location','教會','這裡是一個神聖的地方，你可以在這裡恢復生命值。','Designed by rawpixel.com / Freepik','images/church.svg',NOW(),NOW()),
(DEFAULT, 1,'location','村長家','這裡是村長的家，你可以在這裡接受任務。','Designed by Freepik','images/elder.svg',NOW(),NOW()),
(DEFAULT, 1,'battleground','大草原','這裡是一片廣闊的草原，你可以在這裡找到各種野生動物。','Designed by Freepik','images/plateau.svg',NOW(),NOW()),
(101, 0,'victory','勝利','獲得831EXP、1199G、龍角！','Designed by b0red / pixabay','images/treasure.svg',NOW(),NOW()),
(201, 6,'monster','上古飛龍','這是一隻上古飛龍，它的攻擊力和防禦力都很高，要小心！','Designed by macrovector / Freepik','images/dragon.svg',NOW(),NOW())