module.exports = (sequlize, DataTypes) => {
    return sequlize.define(
       'teacher', //테이블 명
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull : true
            }, //컬럼 생성
            //Sequelize는 컬럼의 id를 지정하지 않아도
            //테이블이 생성 될 때 자동으로 id를 부여한다
        },
        {
            //테이블 속성
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
        }
    )};
//위의 Sequelize를 일반 sql로 바꾸면
/*
create table teacher (
    id int not null,
    name varchar(50),
    primary key(id)
)
와 같다
*/
