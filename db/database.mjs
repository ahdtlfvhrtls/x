/*
  Mongoose
  - MongoDB + Node.js용 ORM(Object-Relational Mapping)
  - 스키마를 정의
  - 입력, 수정, 조회, 삭제 모두 안정적이고 코드를 간결하게 작성
*/

import { config } from "../config.mjs";
import Mongoose from "mongoose";

export async function connectDB() {
  return Mongoose.connect(config.db.host);
}

export function useVirtualId(Schema) {
  Schema.virtual("id").get(function () {
    return this._id.toString();
  });
  Schema.set("toJSON", { virtual: true });
  Schema.set("toObject", { virtual: true });
}
