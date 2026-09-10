-- =========================================================
--  CARTIVA DATABASE SCHEMA
--  Run this once against a fresh database to set up Cartiva.
--
--  Usage:
--    mysql -u root -p < backend/database/schema.sql
--  (or open this file in your MySQL client and run it)
-- =========================================================

CREATE DATABASE IF NOT EXISTS cartiva
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE cartiva;

-- ---------------------------------------------------------
-- USERS
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id                    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name                  VARCHAR(150)        NOT NULL,
    email                 VARCHAR(255)        NOT NULL,
    password_hash         VARCHAR(255)        NOT NULL,

    -- Password reset support (see /api/forgot-password, /api/reset-password).
    -- The raw token is never stored — only its SHA-256 hash — so a leaked
    -- database backup can't be used to reset anyone's password.
    reset_token_hash      VARCHAR(255)        NULL,
    reset_token_expires_at DATETIME           NULL,

    created_at            DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at            DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP
                                               ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY uniq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
