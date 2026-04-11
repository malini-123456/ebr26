-- Drop orphaned tables: Ruangan, Alat, Ipm, Teknisi (removed from schema)

-- Drop join table first
DROP TABLE IF EXISTS "_IpmToTeknisi";

-- Drop tables with foreign keys referencing Ruangan/Alat
DROP TABLE IF EXISTS "Ipm";
DROP TABLE IF EXISTS "Alat";

-- Drop Ruangan and Teknisi
DROP TABLE IF EXISTS "Ruangan";
DROP TABLE IF EXISTS "Teknisi";
