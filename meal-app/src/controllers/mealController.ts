import { Request, Response } from 'express';
import { CreateMealRequest, UpdateMealRequest, ApiResponse, Meal, MealSummary } from '../types';
import MealService from '../services/mealService';
import { asyncHandler } from '../middleware/errorHandler';

class MealController {
    // 全ての食事を取得
    getAllMeals = asyncHandler(async (req: Request, res: Response<ApiResponse<Meal[]>>) => {
        const meals = await MealService.getAllMeals();

        res.json({
            success: true,
            data: meals,
            message: `Found ${meals.length} meals`
        });
    });

    // IDで食事を取得
    getMealById = asyncHandler(async (req: Request, res: Response<ApiResponse<Meal>>) => {
        const { id } = req.params;
        const meal = await MealService.getMealById(id);

        res.json({
            success: true,
            data: meal,
            message: 'Meal found successfully'
        });
    });

    // 新しい食事を作成
    createMeal = asyncHandler(async (req: Request<{}, ApiResponse<Meal>, CreateMealRequest>, res: Response<ApiResponse<Meal>>) => {
        const mealData = req.body;
        const newMeal = await MealService.createMeal(mealData);

        res.status(201).json({
            success: true,
            data: newMeal,
            message: 'Meal created successfully'
        });
    });

    // 食事を更新
    updateMeal = asyncHandler(async (req: Request<{ id: string }, ApiResponse<Meal>, Partial<CreateMealRequest>>, res: Response<ApiResponse<Meal>>) => {
        const { id } = req.params;
        const updateData: UpdateMealRequest = { id, ...req.body };

        const updatedMeal = await MealService.updateMeal(id, updateData);

        res.json({
            success: true,
            data: updatedMeal,
            message: 'Meal updated successfully'
        });
    });

    // 食事を削除
    deleteMeal = asyncHandler(async (req: Request, res: Response<ApiResponse<null>>) => {
        const { id } = req.params;
        await MealService.deleteMeal(id);

        res.json({
            success: true,
            message: 'Meal deleted successfully'
        });
    });

    // 日別サマリーを取得
    getDailySummary = asyncHandler(async (req: Request, res: Response<ApiResponse<MealSummary>>) => {
        const { date } = req.params;
        const summary = await MealService.getDailySummary(date);

        res.json({
            success: true,
            data: summary,
            message: 'Daily summary retrieved successfully'
        });
    });

    // カテゴリ別の食事を取得
    getMealsByCategory = asyncHandler(async (req: Request, res: Response<ApiResponse<Meal[]>>) => {
        const { category } = req.params;
        const meals = await MealService.getMealsByCategory(category as any);

        res.json({
            success: true,
            data: meals,
            message: `Found ${meals.length} ${category} meals`
        });
    });

    // サンプルデータの初期化
    initializeSampleData = asyncHandler(async (req: Request, res: Response<ApiResponse<null>>) => {
        await MealService.initializeSampleData();

        res.json({
            success: true,
            message: 'Sample data initialized successfully'
        });
    });
}

export default new MealController();
