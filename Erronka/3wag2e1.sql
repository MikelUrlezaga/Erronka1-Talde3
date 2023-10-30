-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2023 a las 13:18:36
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `3wag2e1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ekipamendua`
--

CREATE TABLE `ekipamendua` (
  `id` int(11) NOT NULL,
  `izena` varchar(50) NOT NULL,
  `deskribapena` varchar(200) NOT NULL,
  `marka` varchar(20) DEFAULT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `idKategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ekipamendua`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `erabiltzailea`
--

CREATE TABLE `erabiltzailea` (
  `nan` varchar(9) NOT NULL,
  `izena` varchar(20) NOT NULL,
  `abizena` varchar(50) NOT NULL,
  `erabiltzailea` varchar(20) NOT NULL,
  `pasahitza` varchar(20) NOT NULL,
  `rola` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `erabiltzailea`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gela`
--

CREATE TABLE `gela` (
  `id` int(11) NOT NULL,
  `izena` varchar(4) NOT NULL,
  `taldea` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gela`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inbentarioa`
--

CREATE TABLE `inbentarioa` (
  `etiketa` varchar(10) NOT NULL,
  `idEkipamendu` int(11) NOT NULL,
  `erosketaData` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inbentarioa`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kategoria`
--

CREATE TABLE `kategoria` (
  `id` int(11) NOT NULL,
  `izena` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `kategoria`
--
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kokalekua`
--

CREATE TABLE `kokalekua` (
  `etiketa` varchar(10) NOT NULL,
  `idGela` int(11) NOT NULL,
  `hasieraData` date NOT NULL,
  `amaieraData` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `kokalekua`
--

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ekipamendua`
--
ALTER TABLE `ekipamendua`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_kategoria` (`idKategoria`);

--
-- Indices de la tabla `erabiltzailea`
--
ALTER TABLE `erabiltzailea`
  ADD PRIMARY KEY (`nan`);

--
-- Indices de la tabla `gela`
--
ALTER TABLE `gela`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inbentarioa`
--
ALTER TABLE `inbentarioa`
  ADD PRIMARY KEY (`etiketa`),
  ADD KEY `fk_ekipamendua` (`idEkipamendu`);

--
-- Indices de la tabla `kategoria`
--
ALTER TABLE `kategoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `kokalekua`
--
ALTER TABLE `kokalekua`
  ADD PRIMARY KEY (`etiketa`,`hasieraData`),
  ADD KEY `fk_gela` (`idGela`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gela`
--
ALTER TABLE `gela`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ekipamendua`
--
ALTER TABLE `ekipamendua`
  ADD CONSTRAINT `fk_kategoria` FOREIGN KEY (`idKategoria`) REFERENCES `kategoria` (`id`);

--
-- Filtros para la tabla `inbentarioa`
--
ALTER TABLE `inbentarioa`
  ADD CONSTRAINT `fk_ekipamendua` FOREIGN KEY (`idEkipamendu`) REFERENCES `ekipamendua` (`id`);

--
-- Filtros para la tabla `kokalekua`
--
ALTER TABLE `kokalekua`
  ADD CONSTRAINT `fk_gela` FOREIGN KEY (`idGela`) REFERENCES `gela` (`id`),
  ADD CONSTRAINT `fk_inbentarioa` FOREIGN KEY (`etiketa`) REFERENCES `inbentarioa` (`etiketa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
