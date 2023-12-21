import { Router } from "express";
import { container } from "tsyringe";
import { CityController } from "../controllers/cityController";
import { authenticate } from "../middlewares/authMiddleware";

const cityRouter = Router();
const cityController = container.resolve(CityController);
cityRouter.get(
  "/get-by-id/:id",
  cityController.getCityById.bind(cityController),
);
cityRouter.get(
  "/dropdown",
  cityController.getCityDropdown.bind(cityController),
);
cityRouter.post(
  "/create",
  authenticate,
  cityController.createCity.bind(cityController),
);
cityRouter.post(
  "/update",
  authenticate,
  cityController.updateCity.bind(cityController),
);
cityRouter.post(
  "/delete",
  authenticate,
  cityController.deleteCity.bind(cityController),
);
cityRouter.post("/search", cityController.searchCity.bind(cityController));
export default cityRouter;
