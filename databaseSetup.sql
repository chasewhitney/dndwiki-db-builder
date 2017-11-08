CREATE TABLE "spells" (
  "id" serial primary key,
  "index" integer,
  "name" varchar(80) not null,
  "casting_time" varchar(50) not null,
	"classes" varchar(500) not null,
  "components" varchar(50) not null,
  "concentration" varchar(50) not null,
  "description" varchar(8000) not null,
  "duration" varchar(50) not null,
  "higher_level" varchar(1000),
  "level" varchar(50) not null,
  "material" varchar(1000),
  "page" varchar(50),
  "range" varchar(500),
  "ritual" varchar(50),
  "school" varchar(50),
  "url" varchar(500)
);
