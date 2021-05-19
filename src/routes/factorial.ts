import FactorialMiddleWare from "../controllers/factorial";
import * as Router from "koa-router";

const router: Router = new Router();
const factorial = new FactorialMiddleWare();

router.get("/api/v1/factorial/:number", factorial.middleWare);

export default router;
