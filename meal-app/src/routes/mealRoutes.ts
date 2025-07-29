import { Router } from 'express';
import MealController from '../controllers/mealController';

const router = Router();

// 開発用ルート（具体的なルートを先に定義）
router.post('/meals/init/sample-data', MealController.initializeSampleData);

// サマリーとカテゴリのルート（具体的なルートを先に定義）
router.get('/meals/summary/:date', MealController.getDailySummary);
router.get('/meals/category/:category', MealController.getMealsByCategory);

// 食事関連のルート（一般的なルートを後に定義）
router.get('/meals', MealController.getAllMeals);
router.get('/meals/:id', MealController.getMealById);
router.post('/meals', MealController.createMeal);
router.put('/meals/:id', MealController.updateMeal);
router.delete('/meals/:id', MealController.deleteMeal);

export default router;
