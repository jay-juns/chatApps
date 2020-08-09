import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = [];

router.get('/', (req, res) => {
  console.log(users);

  res.send('안녕 여기는 유저야');
});

router.post('/', (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`유저 정보란에 이름 ${user.name} 이 추가되었습니다.`);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`사용자 중 ${id}를 가진 정보가 삭제되었습니다.`);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const {name, username, level } = req.body;

  const user = users.find((user) => user.id === id);

  if(name) user.name = name;
  if(username) user.username = username;
  if(level) user.level = level;

  res.send(`유저정보가 ${id}로 변경되었습니다.`)
});

export default router;