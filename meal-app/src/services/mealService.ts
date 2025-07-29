import { Meal, CreateMealRequest, UpdateMealRequest, MealSummary, MealCategory } from '../types';
import MealModel from '../models/meal';
import { createError } from '../middleware/errorHandler';

class MealService {
    // 全ての食事を取得
    async getAllMeals(): Promise<Meal[]> {
        return MealModel.findAll();
    }

    // IDで食事を取得
    async getMealById(id: string): Promise<Meal> {
        const meal = MealModel.findById(id);
        if (!meal) {
            throw createError('Meal not found', 404);
        }
        return meal;
    }

    // 新しい食事を作成
    async createMeal(mealData: CreateMealRequest): Promise<Meal> {
        // バリデーション
        this.validateMealData(mealData);

        const newMeal = MealModel.create({
            ...mealData,
            date: new Date(), // 現在時刻を設定
        });

        return newMeal;
    }

    // 食事を更新
    async updateMeal(id: string, updateData: UpdateMealRequest): Promise<Meal> {
        // 食事が存在するかチェック
        await this.getMealById(id);

        // 更新データのバリデーション
        if (updateData.calories !== undefined || updateData.protein !== undefined ||
            updateData.carbs !== undefined || updateData.fat !== undefined) {
            this.validateNutritionData({
                calories: updateData.calories,
                protein: updateData.protein,
                carbs: updateData.carbs,
                fat: updateData.fat
            });
        }

        const updatedMeal = MealModel.update(id, updateData);
        if (!updatedMeal) {
            throw createError('Failed to update meal', 500);
        }

        return updatedMeal;
    }

    // 食事を削除
    async deleteMeal(id: string): Promise<void> {
        // 食事が存在するかチェック
        await this.getMealById(id);

        const deleted = MealModel.delete(id);
        if (!deleted) {
            throw createError('Failed to delete meal', 500);
        }
    }

    // 日別の食事サマリーを取得
    async getDailySummary(date: string): Promise<MealSummary> {
        // 日付フォーマットの検証
        const targetDate = new Date(date);
        if (isNaN(targetDate.getTime())) {
            throw createError('Invalid date format', 400);
        }

        const meals = MealModel.findByDate(date);

        const summary: MealSummary = {
            totalCalories: meals.reduce((sum, meal) => sum + meal.calories, 0),
            totalProtein: meals.reduce((sum, meal) => sum + meal.protein, 0),
            totalCarbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
            totalFat: meals.reduce((sum, meal) => sum + meal.fat, 0),
            date: targetDate.toISOString().split('T')[0]
        };

        return summary;
    }

    // カテゴリ別の食事を取得
    async getMealsByCategory(category: MealCategory): Promise<Meal[]> {
        if (!['breakfast', 'lunch', 'dinner', 'snack'].includes(category)) {
            throw createError('Invalid meal category', 400);
        }

        return MealModel.findByCategory(category);
    }

    // 食事データのバリデーション
    private validateMealData(data: CreateMealRequest): void {
        if (!data.name || data.name.trim().length === 0) {
            throw createError('Meal name is required', 400);
        }

        if (data.name.length > 255) {
            throw createError('Meal name is too long (max 255 characters)', 400);
        }

        this.validateNutritionData(data);

        if (!['breakfast', 'lunch', 'dinner', 'snack'].includes(data.category)) {
            throw createError('Invalid meal category', 400);
        }
    }

    // 栄養データのバリデーション
    private validateNutritionData(data: {
        calories?: number;
        protein?: number;
        carbs?: number;
        fat?: number;
    }): void {
        if (data.calories !== undefined && (data.calories < 0 || data.calories > 10000)) {
            throw createError('Calories must be between 0 and 10000', 400);
        }

        if (data.protein !== undefined && (data.protein < 0 || data.protein > 1000)) {
            throw createError('Protein must be between 0 and 1000g', 400);
        }

        if (data.carbs !== undefined && (data.carbs < 0 || data.carbs > 1000)) {
            throw createError('Carbs must be between 0 and 1000g', 400);
        }

        if (data.fat !== undefined && (data.fat < 0 || data.fat > 1000)) {
            throw createError('Fat must be between 0 and 1000g', 400);
        }
    }

    // サンプルデータの初期化（開発用）
    async initializeSampleData(): Promise<void> {
        MealModel.seedData();
    }
}

export default new MealService();
