create USER
    book_ex
IDENTIFIED BY
    book_ex
DEFAULT TABLESPACE USERS
TEMPORARY TABLESPACE TEMP;

CREATE USER
    all_care
IDENTIFIED BY
    all_care
DEFAULT TABLESPACE USERS
TEMPORARY TABLESPACE TEMP;

GRANT CONNECT, DBA TO BOOK_EX;
GRANT CONNECT, DBA TO all_care;

SELECT
    dbms_xdb.gethttpport() 
from 
    dual;
    
exec dbms_xdb.sethttpport(8081);








