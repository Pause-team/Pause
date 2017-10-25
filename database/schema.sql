# Pause
Entertainment tracking app
-- MySQL Script generated by MySQL Workbench
-- Thu Oct 19 11:45:31 2017
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema pause
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pause
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pause` DEFAULT CHARACTER SET utf8 ;
USE `pause` ;

-- -----------------------------------------------------
-- Table `pause`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pause`.`user` (
  `user_id` INT NOT NULL DEFAULT 0,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `created_on` DATETIME NOT NULL,
  `last_login` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pause`.`video`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pause`.`video` (
  `video_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `url` TEXT NULL,
  `created_on` DATETIME NOT NULL,
  `last_viewed` DATETIME NULL,
  PRIMARY KEY (`video_id`, `user_id`),
  INDEX `video_user_id_idx` (`user_id` ASC),
  CONSTRAINT `video_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `pause`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pause`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pause`.`playlist` (
  `playlist_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `private` TINYINT NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`playlist_id`, `user_id`),
  INDEX `playlist_user_idx` (`user_id` ASC),
  CONSTRAINT `playlist_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `pause`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pause`.`playlist_videos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pause`.`playlist_videos` (
  `playlist_id` INT NOT NULL,
  `video_id` INT NOT NULL,
  PRIMARY KEY (`playlist_id`, `video_id`),
  INDEX `video_id_link_idx` (`video_id` ASC),
  CONSTRAINT `playlist_id_link`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `pause`.`playlist` (`playlist_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `video_id_link`
    FOREIGN KEY (`video_id`)
    REFERENCES `pause`.`video` (`video_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;