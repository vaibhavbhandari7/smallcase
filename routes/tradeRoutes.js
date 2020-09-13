const router = require("express").Router();

// controller
const tradeController = require("../controllers/tradeController");

// validator
const validator = require("../validators/");

router.route("/")
  .get(tradeController.getTrades);
router.route("/")
  .post(
    validator.validateBody(validator.schemas.tradeValidator),
    tradeController.addTrade
  );
router.route("/:id")
  .put(validator.validateBody(validator.schemas.tradeUpdateValidator),
    tradeController.updateTradeById
  );
router.route("/:id").delete(tradeController.deleteTradeById);
router.route("/returns").get(tradeController.getReturns);

module.exports = router;
