drop table tbl_member;
drop table tbl_child;
drop table tbl_org;
drop table tbl_regist;
drop table tbl_review;
drop table tbl_bookMark;
drop table tbl_img;

-- alter table tbl_member add constraint pk_memid primary key(memid);
-- desc tbl_member;

-- alter table tbl_child add constraint pk_ch_id primary key(ch_id);
-- desc tbl_child;

create table tbl_member(
    mem_id varchar2(50) primary key,          /* 아이디 : 영어로만 구성 */
    mem_password varchar2(150) not null,      /* 비밀번호 : 영어로만 구성 */
    mem_type nvarchar2(50) not null,          /* 회원유형 : 한글로만 구성*/
    mem_name nvarchar2(20) not null,          /* 회원 이름 : 한글로만 구성*/
    mem_email varchar2(50) not null,          /* 이메일 : 영어로만 구성 */
    mem_phnum varchar2(50) not null,          /* 전화번호 : 숫자+특수문자 이루어짐*/
    mem_address nvarchar2(150) not null,      /* 주소 : 한글로만 구성 */
    mem_regdate date default sysdate,         /* 회원 가입일 */
    mem_updatedate date DEFAULT NULL          /* 정보 수정일 */ 
);

create table tbl_child(
    ch_id varchar2(50) primary key,             /* 자식 고유번호 : 영어+숫자로만 구성 */
    ch_pt_id varchar2(50) not null UNIQUE,     /* 부모의 아이디(FK) : 영어로만 구성   "외래키"*/
    ch_name nvarchar2(20) not null,             /* 자녀 이름 : 한글로만 구성*/
    ch_sex nvarchar2(20) not null,              /* 자녀 성별 : 한글로만 구성*/
    ch_detail nvarchar2(500) not null,          /* 자녀 정보 : 한글+영어로 구성*/
    ch_regdate date default sysdate,            /* 자녀등록일 */
    ch_updatedate date default NULL,            /* 정보수정일 */
    FOREIGN KEY(ch_pt_id) REFERENCES tbl_member(mem_id)
);

create table tbl_org(
    og_num  varchar2(50) primary key,   /* 기관 고유번호 : 영어+숫자로만 구성 */
    og_id   varchar2(50) not null,      /* 관리자 아이디 : 영어로만 구성     "외래키" */
    og_name nvarchar2(50) not null,     /* 기관 이름 : 한글로만 구성 */
    og_cost varchar2(50) not null,      /* 신청 비용 : 숫자로 구성*/
    og_detail nvarchar2(50),            /* 기관 상세정보 : 한글+영어+숫자로 구성 */
    og_accNum varchar2(10) not null,    /* 수용 가능인원 : 숫자로 구성*/
    og_nowNum varchar2(10) not null,    /* 현재 수용인원 : 숫자로 구성*/
    og_address nvarchar2(50) not null,  /* 기관 주소 : 한글로만 구성 */
    og_phone varchar2(10) not null,     /* 기관 전화번호 : 숫자와 '-'로 구성 */
    og_opening nvarchar2(50) not null,  /* 오픈 시간 : 숫자로만 구성 */
    og_closing nvarchar2(50) not null,  /* 마감 주소 : 한글로만 구성 */
    FOREIGN KEY(og_id) REFERENCES tbl_member(mem_id)
);

create table tbl_regist(
    reg_num varchar2(50) primary key,       /* 신청고유번호 : 영어+숫자로 구성 */
    reg_mem_id varchar2(50) not null,       /* 신청자 아이디 : 영어+숫자로 구성     "외래키" */    
    reg_og_num varchar2(50) not null,       /* 기관 고유번호 : 영어+숫자로 구성     "외래키" */
    reg_date date not null,                 /* 신청날짜 & 시간 */
    reg_progress nvarchar2(50) not null,    /* 진행사항 : 예약완료, 위탁중, 위탁완료 */    
    FOREIGN KEY(reg_mem_id) REFERENCES tbl_member(mem_id),
    FOREIGN KEY(reg_og_num) REFERENCES tbl_org(og_num)
);

create table tbl_review(
    rev_num varchar2(50) primary key,       /* 리뷰 고유번호 : 영어+숫자로만 구성 */
    rev_mem_id varchar2(50) not null,       /* 신청자 아이디 : 영어로만 구성       "외래키" */
    rev_og_num varchar2(50) not null,       /* 기관 고유번호 : 영어+숫자로만 구성   "외래키" */
    rev_reg_num varchar2(50) not null,      /* 신청내역 고유번호 : 영어+숫자로 구성 "외래키" */
    rev_details nvarchar2(50) not null,     /* 리뷰 내용 : 한글+영어+숫자로 구성 */
    rev_score nvarchar2(50) not null,       /* 리뷰 평점 : 숫자로만 구성*/
    FOREIGN KEY(rev_mem_id) REFERENCES tbl_member(mem_id),
    FOREIGN KEY(rev_og_num) REFERENCES tbl_org(og_num),
    FOREIGN KEY(rev_reg_num) REFERENCES tbl_regist(reg_num)
);

create table tbl_bookMark(
    bmk_mem_id varchar2(50),        /* 아이디 : 영어로만 구성             복합키 */
    bmk_og_num varchar2(50),       /* 기관 고유번호 : 영어+숫자로만 구성  복합키 */
    bmk_date date default sysdate,  /* 북마크 등록일 */
    CONSTRAINT BMK_PK PRIMARY KEY (bmk_mem_id, bmk_og_num)
);

create table tbl_img(
    img_og_num  varchar2(50),    /* 기관번호 */
    img_og_name  varchar2(50),   /* 사진이름 */
    CONSTRAINT IMG_PK PRIMARY KEY (img_og_num, img_og_name)
);















































































