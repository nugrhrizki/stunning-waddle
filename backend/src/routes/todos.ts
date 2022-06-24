import { Router } from "express";
import { create, destroy, get, getAll, update } from "../controllers/todos";

const router: Router = Router();

router.post("/create", create);

router.get("/get-all", getAll);

router.get("/get", get);

router.patch("/update", update);

router.post("/delete", destroy);

export default router;
