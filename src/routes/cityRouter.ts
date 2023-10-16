import { Router } from 'express';
import { container } from 'tsyringe';
import { CityController } from '../controllers/cityController';

const cityRouter = Router();
const cityController = container.resolve(CityController);
cityRouter.get('/get-by-id/:id', cityController.getCityById.bind(cityController));
cityRouter.get('/dropdown', cityController.getCityDropdown.bind(cityController));
cityRouter.post('/create', cityController.createCity.bind(cityController));
cityRouter.post('/update', cityController.updateCity.bind(cityController));
cityRouter.post('/delete', cityController.deleteCity.bind(cityController));
cityRouter.post('/search', cityController.searchCity.bind(cityController));
export default cityRouter;