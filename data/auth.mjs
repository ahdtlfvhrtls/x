import { db } from "../db/database.mjs";

// 회원 가입
export async function createUser(user) {
  const { userid, password, name, email, url } = user;
  return db
    .execute(
      "INSERT INTO users (userid, password, name, email, url) VALUES(?,?,?,?,?)",
      [userid, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}

// 로그인
export async function login(userid, password) {
  const [user] = await db.query("SELECT * FROM users WHERE userid = ?", [
    userid,
  ]);
  return user[0];
}

export async function findByUserid(userid) {
  return db
    .execute("select * from users where userid=?", [userid])
    .then((result) => result[0][0]);
}

export async function findByid(idx) {
  return db
    .execute("select * from users where idx=?", [idx])
    .then((result) => result[0][0]);
}
