-- MariaDB dump 10.19  Distrib 10.5.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: homeBuddy
-- ------------------------------------------------------
-- Server version	10.5.12-MariaDB-1:10.5.12+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ausgaben`
--

DROP TABLE IF EXISTS `ausgaben`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ausgaben` (
  `id` tinyint(5) NOT NULL AUTO_INCREMENT,
  `datum` date NOT NULL,
  `wer` varchar(65) NOT NULL,
  `wo` varchar(65) DEFAULT NULL,
  `kategorie` varchar(65) DEFAULT NULL,
  `wieviel` decimal(5,0) NOT NULL,
  `kommentar` varchar(65) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ausgaben`
--

LOCK TABLES `ausgaben` WRITE;
/*!40000 ALTER TABLE `ausgaben` DISABLE KEYS */;
INSERT INTO `ausgaben` VALUES (2,'2020-11-10','Sarah','Übertrag alte Tabelle',NULL,3917,NULL),(3,'2020-11-10','Thomas','Übertrag alte Tabelle',NULL,3658,NULL),(4,'2020-11-06','Thomas','Möbel Boss','Wohnung',3,NULL),(5,'2020-11-08','Thomas','Aral','Tanken',48,NULL),(6,'2020-11-06','Thomas','Porta','Wohnung',73,NULL),(7,'2020-11-05','Thomas','Elite Ganja','CBD',40,NULL),(8,'2020-11-17','Sarah','Lukas O. & Julian R.','CBD',59,NULL),(9,'2020-11-20','Thomas','Roller','Wohnung',10,'Tassen und Untersetzer'),(10,'2020-11-21','Thomas','Conrad','Wohnung',58,'Raspi und Zubehör'),(11,'2020-11-30','Sarah','Elite Ganja','CBD',22,NULL),(12,'2020-11-30','Sarah','Bad Utensilien','Wohnung',20,NULL),(13,'2020-12-05','Sarah','CBD Jena','CBD',40,NULL),(14,'2020-12-11','Thomas','Edelrausch ','Geschenke',22,'Wein'),(15,'2020-12-05','Thomas','Tegut','Geschenke',14,'Nikolaus etc. Jena'),(16,'2020-12-12','Thomas','Toom','Baumarkt',26,NULL),(17,'2020-12-16','Sarah','Lukas O. & Julian R.','CBD',105,'Online CBD'),(18,'2020-12-30','Thomas','Penny','sonstiges (Kommentar!)',14,'Sekt'),(19,'2021-02-04','Sarah','div.','sonstiges (Kommentar!)',60,'Fasten und Karsten'),(20,'2021-02-11','Sarah','maison du Monde','Wohnung',120,'Teppich Kissen'),(21,'2021-02-27','Thomas','tegut','Urlaub',35,NULL),(22,'2021-02-26','Thomas','Minol','Tanken',25,NULL),(23,'2021-03-11','Thomas','CleanCar','Tanken',30,NULL),(24,'2021-03-11','Thomas','CleanCar','ausg. Auto',5,'Scheinwerfer Glühbirne'),(25,'2021-03-26','Thomas','CleanCar','Tanken',42,'Tanken'),(26,'2021-03-26','Sarah','amazon','Wohnung',46,'anker &müllbeutel'),(27,'2021-03-26','Sarah','dm','Geschenke',27,'Bianca, Wohnung Max & Bianca'),(28,'2021-03-26','Sarah','Apotheke','sonstiges (Kommentar!)',50,'Schnelltests'),(29,'2021-04-01','Thomas','Post','Geschenke',20,'Ostern'),(30,'2021-04-03','Sarah','Röstgut','Geschenke',16,NULL),(31,'2021-04-03','Sarah','Wildschwein Wurst','Geschenke',10,NULL),(32,'2021-04-03','Sarah','Tank','Tanken',40,NULL),(33,'2021-04-21','Sarah','DM','Geschenke',25,'Baby Zeugs'),(34,'2021-05-04','Thomas','eBay kl. Anzeigen','Wohnung',50,'Router'),(35,'2021-05-07','Thomas','Konsum','Geschenke',14,'Muttertag'),(36,'2021-05-07','Thomas','Shell','Tanken',109,'Frederico'),(37,'2021-05-07','Thomas','Jet','Tanken',15,'Leihwagen'),(38,'2021-05-13','Thomas','Büromarkt Böttcher','ausg. Auto',82,'Frederico'),(39,'2021-05-21','Thomas','Otto','Wohnung',215,'Bettzeug'),(40,'2021-05-21','Thomas','EGG','CBD',35,NULL),(41,'2021-05-30','Sarah','Geschenk Franzi','Geschenke',30,'SUP'),(42,'2021-05-31','Sarah','Toom','Baumarkt',24,'Gießkanne, Pflanenkaszen etc'),(43,'2021-06-04','Sarah','Geschenk Anne','Geschenke',13,'dm (Foto, Masken), Kaffee'),(44,'2021-05-18','Sarah','Baby Uli','Geschenke',10,'Apotheke Öle'),(45,'2021-05-18','Sarah','Dm / Apo','Wohnung',38,'Schnelltests'),(46,'2021-06-07','Sarah','Schneckenprofi','Wohnung',19,'Marienkäferlarven & Häuser'),(47,'2021-06-18','Thomas','Toom','Freizeit',20,'Gepäckspinne, Velo-Schlauch'),(48,'2021-06-18','Thomas','Rückenwind','Freizeit',10,'Spanngurt Fahrrad'),(49,'2021-07-31','Thomas','HEM','Tanken',77,NULL),(50,'2021-08-03','Thomas','EGG','CBD',40,NULL),(51,'2021-07-29','Thomas','Hafen','CBD',40,NULL),(52,'2021-08-13','Thomas','tapir','Freizeit',20,'schüssel, Gas'),(53,'2021-09-28','Sarah','Sauna','Freizeit',40,''),(54,'2021-09-28','Sarah','Ganja','CBD',20,NULL),(55,'2021-09-28','Sarah','Tank','Tanken',15,NULL),(56,'2021-10-11','Sarah','speisekammer','Genuss',5,'tabacchi');
/*!40000 ALTER TABLE `ausgaben` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ausgabenKat`
--

DROP TABLE IF EXISTS `ausgabenKat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ausgabenKat` (
  `id` tinyint(3) NOT NULL AUTO_INCREMENT,
  `kategorie` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ausgabenKat`
--

LOCK TABLES `ausgabenKat` WRITE;
/*!40000 ALTER TABLE `ausgabenKat` DISABLE KEYS */;
INSERT INTO `ausgabenKat` VALUES (1,'Wohnung'),(2,'Baumarkt'),(3,'Auto'),(4,'Geschenke'),(5,'Freizeit'),(6,'Urlaub'),(7,'Genuss'),(8,'sonstiges');
/*!40000 ALTER TABLE `ausgabenKat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `einkaufszettel`
--

DROP TABLE IF EXISTS `einkaufszettel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `einkaufszettel` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `wo` varchar(255) NOT NULL,
  `was` varchar(255) NOT NULL,
  `menge` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `einkaufszettel`
--

LOCK TABLES `einkaufszettel` WRITE;
/*!40000 ALTER TABLE `einkaufszettel` DISABLE KEYS */;
/*!40000 ALTER TABLE `einkaufszettel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `haushaltskasse`
--

DROP TABLE IF EXISTS `haushaltskasse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `haushaltskasse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wer` varchar(65) NOT NULL,
  `datum` date NOT NULL,
  `wieviel` decimal(5,2) NOT NULL,
  `womit` varchar(65) DEFAULT NULL,
  `wo` varchar(65) DEFAULT NULL,
  `stand` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `haushaltskasse`
--

LOCK TABLES `haushaltskasse` WRITE;
/*!40000 ALTER TABLE `haushaltskasse` DISABLE KEYS */;
INSERT INTO `haushaltskasse` VALUES (1,'Sarah','2021-11-03',200.00,NULL,NULL,229.00),(2,'Sarah','2021-11-02',-16.00,NULL,NULL,213.00),(3,'Sarah','2021-11-03',-21.00,NULL,NULL,192.00),(4,'Sarah','2021-11-03',-20.00,NULL,NULL,172.00),(5,'Sarah','2021-11-05',-21.00,NULL,NULL,151.00),(6,'Sarah','2021-11-05',-5.00,NULL,NULL,149.00),(7,'Thomas','2021-11-06',-10.00,'self',NULL,139.00),(8,'Thomas','2021-11-08',-6.00,'self',NULL,133.00),(27,'Thomas','2021-11-09',-10.00,NULL,NULL,123.00),(28,'Thomas','2021-11-09',-10.00,NULL,NULL,113.00),(29,'Thomas','2021-11-09',10.00,NULL,NULL,123.00),(30,'Thomas','2021-11-09',-20.00,NULL,NULL,103.00),(31,'Thomas','2021-11-09',20.00,NULL,NULL,123.00),(32,'Thomas','2021-11-09',-30.00,NULL,NULL,93.00),(33,'Thomas','2021-11-09',30.00,NULL,NULL,123.00),(34,'Thomas','2021-11-09',-10.00,NULL,NULL,113.00),(35,'Thomas','2021-11-09',10.00,NULL,NULL,123.00),(36,'Thomas','2021-11-09',-22.00,NULL,NULL,101.00),(37,'Thomas','2021-11-09',22.00,NULL,NULL,123.00),(38,'Thomas','2021-11-09',-10.00,NULL,NULL,113.00),(39,'Thomas','2021-11-09',10.00,NULL,NULL,123.00),(40,'Thomas','2021-11-09',-15.00,NULL,NULL,108.00),(41,'Thomas','2021-11-09',15.00,NULL,NULL,123.00),(42,'Thomas','2021-11-09',-12.00,NULL,NULL,111.00),(43,'Thomas','2021-11-09',12.00,NULL,NULL,123.00),(44,'Thomas','2021-11-09',-121.00,NULL,NULL,2.00),(45,'Thomas','2021-11-09',121.00,NULL,NULL,123.00),(46,'Thomas','2021-11-09',-11.00,NULL,NULL,112.00),(47,'Thomas','2021-11-09',11.00,NULL,NULL,123.00),(48,'Thomas','2021-11-09',-5.00,NULL,NULL,118.00),(49,'Thomas','2021-11-09',5.00,NULL,NULL,123.00),(50,'Thomas','2021-11-09',-2.00,NULL,NULL,121.00),(51,'Thomas','2021-11-09',2.00,NULL,NULL,123.00);
/*!40000 ALTER TABLE `haushaltskasse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persKonto`
--

DROP TABLE IF EXISTS `persKonto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persKonto` (
  `uid` tinyint(4) NOT NULL AUTO_INCREMENT,
  `konto` decimal(5,2) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persKonto`
--

LOCK TABLES `persKonto` WRITE;
/*!40000 ALTER TABLE `persKonto` DISABLE KEYS */;
INSERT INTO `persKonto` VALUES (1,0.00),(2,0.00);
/*!40000 ALTER TABLE `persKonto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Thomas','info@ingebrixen.de','ddf1d16a7d28304bffb9933f1464417f29f4048e63b906522868246fd1c9188b1b957d4da651341e38310f28702ccadb8594dcdaa38aa22af50ff8d75b23134d'),(2,'Sarah','sarahdoberitz@gmail.com','df0e04b485dca94750c3dd605d888513129b3ace00ae013a2c8ddf6c4b3ba2d1e714618d3efa4e3dbcfd96ffb8968f3a88e94a215964ca84b59039089c2b937b');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'homeBuddy'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-14 18:16:25
