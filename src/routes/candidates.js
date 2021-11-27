const router = require("express").Router();
const candidates = require("../controllers/candidates");

router.get("/", candidates.getAll);
router.get("/:id", candidates.getById);
router.get("/byName/:name", candidates.getByName);
router.post(
  "/",
  candidates.create,
);
router.post(
  "/education/:id",
  candidates.addEducation,
);
router.post(
  "/workExperience/:id",
  candidates.addWorkExperience,
);
router.put(
  "/:id",
  candidates.update,
);
router.put(
  "/:id/education/:educationId",
  candidates.updateEducation,
);
router.put(
  "/:id/workExperience/:workExperienceId",
  candidates.updateWorkExperience,
);
router.delete("/:id", candidates.remove);
router.delete("/:id/education/:educationId", candidates.removeEducation);
router.delete(
  "/:id/workExperience/:workExperienceId",
  candidates.removeWorkExperience,
);

module.exports = router;
