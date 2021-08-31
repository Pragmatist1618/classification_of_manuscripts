import sqlite3
from pprint import pprint
connect = sqlite3.connect("../db.sqlite3")
cursor = connect.cursor()

# CREATE TABLE "v1_manuscript" (
# 	"id"	                    integer         NOT NULL,
# 	"title"	                    varchar(255)    NOT NULL    UNIQUE,
# 	"author"	                varchar(255),
# 	"storage"	                varchar(255),
# 	"creation_date"	            varchar(255)    NOT NULL,
# 	"gospel"	                varchar(7),
# 	"lectionary"	            bool            NOT NULL,
# 	"lectionary_description"	text            CHECK((JSON_VALID("lectionary_description") OR "lectionary_description" IS NULL)),
# 	"description"	            text            CHECK((JSON_VALID("description") OR "description" IS NULL)),
# 	PRIMARY KEY("id" AUTOINCREMENT)
# );
def print_all_records():
    cursor.execute("SELECT * FROM v1_manuscript")
    all_results = cursor.fetchall()
    pprint(all_results)

if __name__ == '__main__':
    print_all_records()