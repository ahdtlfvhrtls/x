import * as authRepository from "../data/auth.mjs";

// 회원 가입
export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const users = await authRepository.createUser(userid, password, name, email);
  if (users) {
    res.status(201).json(users);
  }
}

// 로그인
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.login(userid, password);
  if (user) {
    req.session.user = { userid };
    res.status(200).json(`${userid}님 로그인 완료!`);
  } else {
    res
      .status(404)
      .json({ message: `${userid}님 아이디 또는 비밀번호를 확인하세요` });
  }
}

// 로그인 확인
export function me(req, res) {
  const user = req.session.user;
  if (!user) {
    res.status(404).json({ message: "로그인이 필요합니다." });
  } else {
    res.status(200).json({ message: "현재 로그인 중입니다." });
  }
}

// 로그아웃
export function logout(req, res) {
  req.session.destroy(() => {
    res.send("로그아웃 되었습니다.");
  });
}
