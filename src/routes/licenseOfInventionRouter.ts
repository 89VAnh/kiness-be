import { Router } from "express";
import { container } from "tsyringe";
import { LicenseOfInventionController } from "../controllers/licenseOfInventionController";
import { authenticate } from "../middlewares/authMiddleware";

const licenseOfInventionRouter = Router();
const licenseOfInventionController = container.resolve(
  LicenseOfInventionController,
);

licenseOfInventionRouter.post(
  "/create",
  authenticate,
  licenseOfInventionController.createLicenseOfInvention.bind(
    licenseOfInventionController,
  ),
);

licenseOfInventionRouter.post(
  "/update",
  authenticate,
  licenseOfInventionController.updateLicenseOfInvention.bind(
    licenseOfInventionController,
  ),
);

licenseOfInventionRouter.post(
  "/delete",
  authenticate,
  licenseOfInventionController.deleteLicenseOfInvention.bind(
    licenseOfInventionController,
  ),
);

licenseOfInventionRouter.get(
  "/get-detail/:id",
  authenticate,
  licenseOfInventionController.getDetailLicenseOfInvention.bind(
    licenseOfInventionController,
  ),
);

licenseOfInventionRouter.post(
  "/search",
  licenseOfInventionController.searchLicenses.bind(
    licenseOfInventionController,
  ),
);

export default licenseOfInventionRouter;
