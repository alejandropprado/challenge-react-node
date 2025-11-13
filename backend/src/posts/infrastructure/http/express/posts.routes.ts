import { PosgreSQLPostRepository } from "../../orm/postPg.repository";
import { buildPostRouter } from "./post.router.factory";

const repo = new PosgreSQLPostRepository();
export default buildPostRouter(repo);
