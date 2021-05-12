import * as Router from "koa-router";
import Logout from "../controllers/logout";

const logout: any = new Logout();
const router: Router = new Router();

router.get("/logout", logout.logout);

export default router;
