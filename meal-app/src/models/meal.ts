import { Meal, MealCategory } from '../types';
import { v4 as uuidv4 } from 'uuid';

// インメモリデータストレージ（本番環境では実際のデータベースを使用）
class MealModel {
  private meals: Meal[] = [];

  // 全ての食事を取得
  findAll(): Meal[] {
    return this.meals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // IDで食事を取得
  findById(id: string): Meal | undefined {
    return this.meals.find(meal => meal.id === id);
  }

  // 日付で食事を取得
  findByDate(date: string): Meal[] {
    const targetDate = new Date(date).toDateString();
    return this.meals.filter(meal => 
      new Date(meal.date).toDateString() === targetDate
    );
  }

  // カテゴリで食事を取得
  findByCategory(category: MealCategory): Meal[] {
    return this.meals.filter(meal => meal.category === category);
  }

  // 新しい食事を作成
  create(mealData: Omit<Meal, 'id'>): Meal {
    const newMeal: Meal = {
      id: uuidv4(),
      ...mealData,
      date: new Date(mealData.date)
    };
    
    this.meals.push(newMeal);
    return newMeal;
  }

  // 食事を更新
  update(id: string, updateData: Partial<Omit<Meal, 'id'>>): Meal | null {
    const mealIndex = this.meals.findIndex(meal => meal.id === id);
    
    if (mealIndex === -1) {
      return null;
    }

    // 日付が文字列で来た場合はDateオブジェクトに変換
    if (updateData.date && typeof updateData.date === 'string') {
      updateData.date = new Date(updateData.date);
    }

    this.meals[mealIndex] = {
      ...this.meals[mealIndex],
      ...updateData
    };

    return this.meals[mealIndex];
  }

  // 食事を削除
  delete(id: string): boolean {
    const initialLength = this.meals.length;
    this.meals = this.meals.filter(meal => meal.id !== id);
    return this.meals.length < initialLength;
  }

  // データベースをクリア（テスト用）
  clear(): void {
    this.meals = [];
  }

  // サンプルデータの追加（開発用）
  seedData(): void {
    const sampleMeals: Omit<Meal, 'id'>[] = [
      {
        name: "朝食：オートミール",
        description: "バナナとナッツ入り",
        calories: 350,
        protein: 12,
        carbs: 54,
        fat: 8,
        date: new Date(),
        category: 'breakfast'
      },
      {
        name: "昼食：グリルチキンサラダ",
        description: "野菜たっぷりサラダ",
        calories: 450,
        protein: 35,
        carbs: 15,
        fat: 25,
        date: new Date(),
        category: 'lunch'
      }
    ];

    sampleMeals.forEach(meal => this.create(meal));
  }
}

export default new MealModel();
