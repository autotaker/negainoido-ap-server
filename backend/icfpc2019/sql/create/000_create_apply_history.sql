CREATE TABLE IF NOT EXISTS apply_history (
    script_id VARCHAR(100) NOT NULL,
    `version` INT(3) NOT NULL,
    `release` INT(2) NOT NULL,
    prc_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (script_id, `version`, `release`)
)
