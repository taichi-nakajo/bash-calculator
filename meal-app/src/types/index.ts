// 食事管理アプリの型定義

export interface Meal {
    id: string;
    name: string;
    description?: string;
    calories: number;
    protein: number;  // タンパク質 (g)
    carbs: number;    // 炭水化物 (g)
    fat: number;      // 脂質 (g)
    date: Date;
    userId?: string;
    category: MealCategory;
}

export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface CreateMealRequest {
    name: string;
    description?: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    category: MealCategory;
}

export interface UpdateMealRequest extends Partial<CreateMealRequest> {
    id: string;
}

export interface MealSummary {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    date: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
