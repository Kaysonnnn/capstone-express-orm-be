/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `comment_date` date NOT NULL,
  `content` text NOT NULL,
  `deleted_by` int NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) DEFAULT NULL,
  `path` varchar(500) NOT NULL,
  `description` text,
  `user_id` int NOT NULL,
  `deleted_by` int NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `saved_images`;
CREATE TABLE `saved_images` (
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `saved_date` date NOT NULL,
  `deleted_by` int NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`image_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `saved_images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `saved_images_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `deleted_by` int NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`comment_id`, `user_id`, `image_id`, `comment_date`, `content`, `deleted_by`, `is_deleted`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-09-06', 'Đây là ảnh đầu tiên mình up lên.', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(2, 2, 1, '2025-09-06', 'Ảnh đẹp quá bạn ơi!', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(3, 3, 1, '2025-09-06', 'Rất ấn tượng 👍', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(4, 2, 2, '2025-09-06', 'Đây là ảnh của mình.', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(5, 1, 2, '2025-09-06', 'Ảnh này trông hay đấy.', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(6, 4, 2, '2025-09-06', 'Like tấm này!', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(7, 3, 3, '2025-09-06', 'Ảnh kỷ niệm của mình.', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(8, 2, 3, '2025-09-06', 'Đẹp quá trời luôn.', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(9, 5, 3, '2025-09-06', 'Màu sắc rất hài hòa.', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(10, 4, 4, '2025-09-06', 'Chia sẻ cho bạn bè xem.', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(11, 1, 4, '2025-09-06', 'Rất tuyệt vời 👍', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(12, 6, 4, '2025-09-06', 'Có phong cách riêng đấy!', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(13, 5, 5, '2025-09-06', 'Rất thích tấm này.', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(14, 3, 5, '2025-09-06', 'Chụp đẹp quá!', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(15, 2, 5, '2025-09-06', 'Mình lưu lại nhé.', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(16, 6, 6, '2025-09-06', 'Ảnh nghệ thuật của mình.', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(17, 4, 6, '2025-09-06', 'Ảnh rất chất lượng.', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(18, 5, 6, '2025-09-06', 'Đẹp mê luôn!', 0, 0, NULL, '2025-09-06 17:16:52', '2025-09-06 17:16:52'),
(19, 1, 2, '2025-09-13', 'Ảnh này đẹp quá nhỉ!', 0, 0, NULL, '2025-09-13 12:25:14', '2025-09-13 12:25:14'),
(20, 1, 2, '2025-09-13', 'Tuyệt vời!', 0, 0, NULL, '2025-09-13 13:18:30', '2025-09-13 13:18:30'),
(21, 1, 1, '2025-09-13', 'Hello', 0, 0, NULL, '2025-09-13 13:30:10', '2025-09-13 13:30:10'),
(22, 1, 1, '2025-09-13', 'Hình đẹp quá', 0, 0, NULL, '2025-09-13 13:30:32', '2025-09-13 13:30:32'),
(23, 1, 1, '2025-09-13', 'Hello', 0, 0, NULL, '2025-09-13 13:33:00', '2025-09-13 13:33:00'),
(24, 1, 1, '2025-09-13', 'Hình oke', 0, 0, NULL, '2025-09-13 13:34:02', '2025-09-13 13:34:02'),
(25, 1, 1, '2025-09-13', 'Hello', 0, 0, NULL, '2025-09-13 13:38:26', '2025-09-13 13:38:26'),
(26, 1, 4, '2025-09-13', 'Xinh quá!', 0, 0, NULL, '2025-09-13 13:42:00', '2025-09-13 13:42:00'),
(27, 2, 6, '2025-09-13', 'Ảnh AI đẹp quá', 0, 0, NULL, '2025-09-13 14:05:36', '2025-09-13 14:05:36'),
(28, 3, 8, '2025-09-14', 'Ảnh của tôi', 0, 0, NULL, '2025-09-14 18:34:39', '2025-09-14 18:34:39');
INSERT INTO `images` (`image_id`, `image_name`, `path`, `description`, `user_id`, `deleted_by`, `is_deleted`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Portrait Double Exposure', 'image/upload/v1757180617/image_1_dfgma6', 'Chân dung cô gái cầm máy ảnh với hiệu ứng phong cảnh trong đầu', 1, 0, 0, NULL, '2025-09-06 17:16:48', '2025-09-09 16:53:07'),
(2, 'Robot with Flowers', 'image/upload/v1757180616/image_2_csyiej', 'Robot dễ thương cầm bó hoa hồng', 2, 0, 0, NULL, '2025-09-06 17:16:48', '2025-09-09 17:01:09'),
(3, 'Water Spirit', 'image/upload/v1757180616/image_3_s7wbhn', 'Cô bé mắt xanh trong nước với lá cây trên đầu', 3, 0, 0, NULL, '2025-09-06 17:16:48', '2025-09-09 17:01:09'),
(4, 'Cozy Glow', 'image/upload/v1757180616/image_4_gmrk4f', 'Cô gái mặc áo hoodie lông thú trong ánh sáng xanh cam', 4, 0, 0, NULL, '2025-09-06 17:16:48', '2025-09-09 17:01:09'),
(5, 'Space Warrior', 'image/upload/v1757180616/image_5_mnjuwi', 'Chiến binh giáp xanh trắng cầm súng năng lượng', 5, 0, 0, NULL, '2025-09-06 17:16:48', '2025-09-09 17:01:09'),
(6, 'Flying Dragon', 'image/upload/v1757180616/image_6_shv35i', 'Rồng khổng lồ màu cam xanh đang bay', 6, 0, 0, NULL, '2025-09-06 17:16:48', '2025-09-09 17:01:09'),
(8, 'Akaza', 'image/upload/v1757873878/images/nvcj4bwixlmcctqslbif', 'Thượng Tam Akaza', 3, 0, 0, NULL, '2025-09-14 18:18:00', '2025-09-14 18:18:00'),
(9, 'MuiChiRo', 'image/upload/v1757874732/images/lugp7jbopptioefqilgy', 'MuiChiRo', 3, 0, 0, NULL, '2025-09-14 18:32:14', '2025-09-14 18:32:14');
INSERT INTO `saved_images` (`user_id`, `image_id`, `saved_date`, `deleted_by`, `is_deleted`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-09-13', 0, 0, NULL, '2025-09-13 17:50:29', '2025-09-13 17:50:29'),
(1, 3, '2025-09-13', 0, 0, NULL, '2025-09-13 17:59:59', '2025-09-13 17:59:59'),
(1, 4, '2025-09-13', 0, 0, NULL, '2025-09-13 17:59:48', '2025-09-13 17:59:48'),
(1, 5, '2025-09-13', 0, 0, NULL, '2025-09-13 17:59:39', '2025-09-13 17:59:39'),
(1, 6, '2025-09-13', 0, 0, NULL, '2025-09-13 17:59:51', '2025-09-13 17:59:51'),
(3, 3, '2025-09-14', 0, 0, NULL, '2025-09-14 11:15:03', '2025-09-14 11:15:03'),
(3, 4, '2025-09-14', 0, 0, NULL, '2025-09-14 11:15:21', '2025-09-14 11:15:21'),
(3, 6, '2025-09-14', 0, 0, NULL, '2025-09-14 11:15:27', '2025-09-14 11:15:27');
INSERT INTO `users` (`user_id`, `email`, `password`, `full_name`, `age`, `avatar`, `deleted_by`, `is_deleted`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'huydev@gmail.com', '$2b$10$XMEVCJjzQLtb0uvuyLfVqeZ6e0rM4MVl/pWPOR5PzFMOfl/gVn0E2', 'Nguyễn Minh Huy', 22, 'image/upload/v1757177143/avatar1_rqaq53', 0, 0, NULL, '2025-09-04 16:11:22', '2025-09-06 17:01:39'),
(2, 'huydev1@gmail.com', '$2b$10$XMEVCJjzQLtb0uvuyLfVqeZ6e0rM4MVl/pWPOR5PzFMOfl/gVn0E2', 'Nguyễn Minh Huy 1', 23, 'image/upload/v1757177127/avatar4_yogtkk', 0, 0, NULL, '2025-09-06 16:03:47', '2025-09-06 17:02:43'),
(3, 'huydev2@gmail.com', '$2b$10$XMEVCJjzQLtb0uvuyLfVqeZ6e0rM4MVl/pWPOR5PzFMOfl/gVn0E2', 'Nguyễn Minh Huy 2', 24, 'image/upload/v1757177030/avatar2_e0qwcr', 0, 0, NULL, '2025-09-06 16:03:47', '2025-09-06 17:03:13'),
(4, 'huydev3@gmail.com', '$2b$10$XMEVCJjzQLtb0uvuyLfVqeZ6e0rM4MVl/pWPOR5PzFMOfl/gVn0E2', 'Nguyễn Minh Huy 3', 25, 'image/upload/v1757177030/avatar6_cyoeta', 0, 0, NULL, '2025-09-06 16:03:47', '2025-09-06 17:04:52'),
(5, 'huydev4@gmail.com', '$2b$10$XMEVCJjzQLtb0uvuyLfVqeZ6e0rM4MVl/pWPOR5PzFMOfl/gVn0E2', 'Nguyễn Minh Huy 4', 26, 'image/upload/v1757177030/avatar3_r9cmvp', 0, 0, NULL, '2025-09-06 16:03:47', '2025-09-06 17:05:14'),
(6, 'huydev5@gmail.com', '$2b$10$XMEVCJjzQLtb0uvuyLfVqeZ6e0rM4MVl/pWPOR5PzFMOfl/gVn0E2', 'Nguyễn Minh Huy 5', 27, 'image/upload/v1757177029/avatar5_ikgjgn', 0, 0, NULL, '2025-09-06 16:03:47', '2025-09-06 17:05:34');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;