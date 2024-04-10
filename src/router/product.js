import { Router } from 'express';
import { add, getAll, getById, remove, update } from '../controllner/product';

const router = Router();

router.get("/products", getAll);
router.get("/products/:id", getById);
router.delete("/products/:id", remove);
router.post("/products", add);
router.put("/products/:id", update);

export default router;
