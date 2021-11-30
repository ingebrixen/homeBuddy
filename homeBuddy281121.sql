-- MySQL dump 10.19  Distrib 10.3.31-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	10.3.31-MariaDB-1:10.3.31+maria~focal-log

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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ausgaben`
--

LOCK TABLES `ausgaben` WRITE;
/*!40000 ALTER TABLE `ausgaben` DISABLE KEYS */;
INSERT INTO `ausgaben` VALUES (2,'2020-11-10','Sarah','Übertrag alte Tabelle',NULL,3917,NULL),(3,'2020-11-10','Thomas','Übertrag alte Tabelle',NULL,3658,NULL),(4,'2020-11-06','Thomas','Möbel Boss','Wohnung',3,NULL),(5,'2020-11-08','Thomas','Aral','Tanken',48,NULL),(6,'2020-11-06','Thomas','Porta','Wohnung',73,NULL),(7,'2020-11-05','Thomas','Elite Ganja','Genuss',40,NULL),(8,'2020-11-17','Sarah','Lukas O. & Julian R.','Genuss',59,NULL),(9,'2020-11-20','Thomas','Roller','Wohnung',10,'Tassen und Untersetzer'),(10,'2020-11-21','Thomas','Conrad','Wohnung',58,'Raspi und Zubehör'),(11,'2020-11-30','Sarah','Elite Ganja','Genuss',22,NULL),(12,'2020-11-30','Sarah','Bad Utensilien','Wohnung',20,NULL),(13,'2020-12-05','Sarah','CBD Jena','Genuss',40,NULL),(14,'2020-12-11','Thomas','Edelrausch ','Geschenke',22,'Wein'),(15,'2020-12-05','Thomas','Tegut','Geschenke',14,'Nikolaus etc. Jena'),(16,'2020-12-12','Thomas','Toom','Baumarkt',26,NULL),(17,'2020-12-16','Sarah','Lukas O. & Julian R.','Genuss',105,'Online CBD'),(18,'2020-12-30','Thomas','Penny','sonstiges',14,'Sekt'),(19,'2021-02-04','Sarah','div.','sonstiges',60,'Fasten und Karsten'),(20,'2021-02-11','Sarah','maison du Monde','Wohnung',120,'Teppich Kissen'),(21,'2021-02-27','Thomas','tegut','Urlaub',35,NULL),(22,'2021-02-26','Thomas','Minol','Tanken',25,NULL),(23,'2021-03-11','Thomas','CleanCar','Tanken',30,NULL),(24,'2021-03-11','Thomas','CleanCar','ausg. Auto',5,'Scheinwerfer Glühbirne'),(25,'2021-03-26','Thomas','CleanCar','Tanken',42,'Tanken'),(26,'2021-03-26','Sarah','amazon','Wohnung',46,'anker &müllbeutel'),(27,'2021-03-26','Sarah','dm','Geschenke',27,'Bianca, Wohnung Max & Bianca'),(28,'2021-03-26','Sarah','Apotheke','sonstiges',50,'Schnelltests'),(29,'2021-04-01','Thomas','Post','Geschenke',20,'Ostern'),(30,'2021-04-03','Sarah','Röstgut','Geschenke',16,NULL),(31,'2021-04-03','Sarah','Wildschwein Wurst','Geschenke',10,NULL),(32,'2021-04-03','Sarah','Tank','Tanken',40,NULL),(33,'2021-04-21','Sarah','DM','Geschenke',25,'Baby Zeugs'),(34,'2021-05-04','Thomas','eBay kl. Anzeigen','Wohnung',50,'Router'),(35,'2021-05-07','Thomas','Konsum','Geschenke',14,'Muttertag'),(36,'2021-05-07','Thomas','Shell','Tanken',109,'Frederico'),(37,'2021-05-07','Thomas','Jet','Tanken',15,'Leihwagen'),(38,'2021-05-13','Thomas','Büromarkt Böttcher','ausg. Auto',82,'Frederico'),(39,'2021-05-21','Thomas','Otto','Wohnung',215,'Bettzeug'),(40,'2021-05-21','Thomas','EGG','Genuss',35,NULL),(41,'2021-05-30','Sarah','Geschenk Franzi','Geschenke',30,'SUP'),(42,'2021-05-31','Sarah','Toom','Baumarkt',24,'Gießkanne, Pflanenkaszen etc'),(43,'2021-06-04','Sarah','Geschenk Anne','Geschenke',13,'dm (Foto, Masken), Kaffee'),(44,'2021-05-18','Sarah','Baby Uli','Geschenke',10,'Apotheke Öle'),(45,'2021-05-18','Sarah','Dm / Apo','Wohnung',38,'Schnelltests'),(46,'2021-06-07','Sarah','Schneckenprofi','Wohnung',19,'Marienkäferlarven & Häuser'),(47,'2021-06-18','Thomas','Toom','Freizeit',20,'Gepäckspinne, Velo-Schlauch'),(48,'2021-06-18','Thomas','Rückenwind','Freizeit',10,'Spanngurt Fahrrad'),(49,'2021-07-31','Thomas','HEM','Tanken',77,NULL),(50,'2021-08-03','Thomas','EGG','Genuss',40,NULL),(51,'2021-07-29','Thomas','Hafen','Genuss',40,NULL),(52,'2021-08-13','Thomas','tapir','Freizeit',20,'schüssel, Gas'),(53,'2021-09-28','Sarah','Sauna','Freizeit',40,''),(54,'2021-09-28','Sarah','Ganja','Genuss',20,NULL),(55,'2021-09-28','Sarah','Tank','Tanken',15,NULL),(56,'2021-10-11','Sarah','speisekammer','Genuss',5,'tabacchi');
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `haushaltskasse`
--

LOCK TABLES `haushaltskasse` WRITE;
/*!40000 ALTER TABLE `haushaltskasse` DISABLE KEYS */;
INSERT INTO `haushaltskasse` VALUES (1,'Sarah','2021-11-01',200.00,'self',NULL,200.00),(2,'Thomas','2021-11-01',200.00,'self',NULL,400.00),(49,'Thomas','2021-11-27',-10.00,'lend',NULL,390.00);
/*!40000 ALTER TABLE `haushaltskasse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persKonto`
--

DROP TABLE IF EXISTS `persKonto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persKonto` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `uid` tinyint(4) NOT NULL,
  `konto` decimal(5,2) NOT NULL,
  `lend` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persKonto`
--

LOCK TABLES `persKonto` WRITE;
/*!40000 ALTER TABLE `persKonto` DISABLE KEYS */;
INSERT INTO `persKonto` VALUES (1,1,-10.00,-10.00),(2,2,0.00,-14.00);
/*!40000 ALTER TABLE `persKonto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `sumAusg`
--

DROP TABLE IF EXISTS `sumAusg`;
/*!50001 DROP VIEW IF EXISTS `sumAusg`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `sumAusg` (
  `wer` tinyint NOT NULL,
  `sumAusgaben` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `sumByKat`
--

DROP TABLE IF EXISTS `sumByKat`;
/*!50001 DROP VIEW IF EXISTS `sumByKat`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `sumByKat` (
  `kategorie` tinyint NOT NULL,
  `sumKat` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `sumMonth`
--

DROP TABLE IF EXISTS `sumMonth`;
/*!50001 DROP VIEW IF EXISTS `sumMonth`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `sumMonth` (
  `Monat` tinyint NOT NULL,
  `Summe` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `sumStand`
--

DROP TABLE IF EXISTS `sumStand`;
/*!50001 DROP VIEW IF EXISTS `sumStand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `sumStand` (
  `Stand` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

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
-- Final view structure for view `sumAusg`
--

/*!50001 DROP TABLE IF EXISTS `sumAusg`*/;
/*!50001 DROP VIEW IF EXISTS `sumAusg`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `sumAusg` AS select `ausgaben`.`wer` AS `wer`,sum(`ausgaben`.`wieviel`) AS `sumAusgaben` from `ausgaben` group by `ausgaben`.`wer` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sumByKat`
--

/*!50001 DROP TABLE IF EXISTS `sumByKat`*/;
/*!50001 DROP VIEW IF EXISTS `sumByKat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `sumByKat` AS select `ausgaben`.`kategorie` AS `kategorie`,sum(`ausgaben`.`wieviel`) AS `sumKat` from `ausgaben` where `ausgaben`.`kategorie` is not null group by `ausgaben`.`kategorie` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sumMonth`
--

/*!50001 DROP TABLE IF EXISTS `sumMonth`*/;
/*!50001 DROP VIEW IF EXISTS `sumMonth`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `sumMonth` AS select date_format(`haushaltskasse`.`datum`,'%M %Y') AS `Monat`,sum(`haushaltskasse`.`wieviel`) AS `Summe` from `haushaltskasse` group by month(`haushaltskasse`.`datum`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sumStand`
--

/*!50001 DROP TABLE IF EXISTS `sumStand`*/;
/*!50001 DROP VIEW IF EXISTS `sumStand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `sumStand` AS select sum(`haushaltskasse`.`wieviel`) AS `Stand` from `haushaltskasse` group by month('datum') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-28 12:43:05
