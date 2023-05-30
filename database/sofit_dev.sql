-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2023 at 09:08 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tes_auth`
--

-- --------------------------------------------------------

--
-- Table structure for table `history_result`
--

CREATE TABLE `history_result` (
  `result_id` varchar(25) NOT NULL,
  `user_id` varchar(25) NOT NULL,
  `category` varchar(20) DEFAULT NULL,
  `result_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(8) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
('7FlY7G8v', 'ther1ple', 'nandi@rocketmail.com', '7488e331b8b64e5794da3fa4eb10ad5d'),
('e_QbB3EK', 'nandogaming', 'nandogaming@gmail.com', 'c991c111903bedc4844136b3f92f5714'),
('fqPbTz_I', 'theriple', 'nandi@gmail.com', '7488e331b8b64e5794da3fa4eb10ad5d');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history_result`
--
ALTER TABLE `history_result`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history_result`
--
ALTER TABLE `history_result`
  ADD CONSTRAINT `history_result_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
