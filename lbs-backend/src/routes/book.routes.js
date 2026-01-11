const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const permit = require("../middleware/permission.middleware");
const bookCtrl = require("../controllers/book.controller");

router.get("/", auth, permit("view"), bookCtrl.getBooks);
router.post("/", auth, permit("create"), bookCtrl.createBook);
router.put("/:id", auth, permit("edit"), bookCtrl.updateBook);
router.delete("/:id", auth, permit("delete"), bookCtrl.deleteBook);

router.post("/:id/borrow", auth, permit("view"), bookCtrl.borrowBook);
router.post("/:id/return", auth, permit("view"), bookCtrl.returnBook);

module.exports = router;

