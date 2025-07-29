import { v4 as uuidv4 } from 'uuid';
import { Meal, MealCategory } from '../types';
import db from '../config/database';

export class MealModel {
  // 全ての食事を取得
  static findAll(): Meal[] {
    const stmt = db.prepare('SELECT * FROM meals ORDER BY date DESC, created_at DESC');
    const rows = stmt.all() as any[];
    
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      category: row.category as MealCategory,
      calories: row.calories,
      nutrition: {
        protein: row.protein,
        carbs: row.carbs,
        fat: row.fat,
        fiber: row.fiber,
        sugar: row.sugar,
        sodium: row.sodium
      },
      date: row.date,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }));
  }

  // IDで食事を取得
  static findById(id: string): Meal | null {
    const stmt = db.prepare('SELECT * FROM meals WHERE id = ?');
    const row = stmt.get(id) as any;
    
    if (!row) return null;
    
    return {
      id: row.id,
      name: row.name,
      category: row.category as MealCategory,
      calories: row.calories,
      nutrition: {
        protein: row.protein,
        carbs: row.carbs,
        fat: row.fat,
        fiber: row.fiber,
        sugar: row.sugar,
        sodium: row.sodium
      },
      date: row.date,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }

  // 新しい食事を作成
  static create(mealData: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>): Meal {
    const id = uuidv4();
    const now = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO meals (
        id, name, category, calories, protein, carbs, fat, 
        fiber, sugar, sodium, date, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      id,
      mealData.name,
      mealData.category,
      mealData.calories,
      mealData.nutrition.protein,
      mealData.nutrition.carbs,
      mealData.nutrition.fat,
      mealData.nutrition.fiber || 0,
      mealData.nutrition.sugar || 0,
      mealData.nutrition.sodium || 0,
      mealData.date,
      now,
      now
    );
    
    return {
      id,
      ...mealData,
      createdAt: new Date(now),
      updatedAt: new Date(now)
    };
  }

  // 食事を更新
  static update(id: string, mealData: Partial<Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>>): Meal | null {
    const existing = this.findById(id);
    if (!existing) return null;
    
    const now = new Date().toISOString();
    
    // 更新可能なフィールドのみを動的に構築
    const updateFields: string[] = [];
    const values: any[] = [];
    
    if (mealData.name !== undefined) {
      updateFields.push('name = ?');
      values.push(mealData.name);
    }
    
    if (mealData.category !== undefined) {
      updateFields.push('category = ?');
      values.push(mealData.category);
    }
    
    if (mealData.calories !== undefined) {
      updateFields.push('calories = ?');
      values.push(mealData.calories);
    }
    
    if (mealData.nutrition) {
      if (mealData.nutrition.protein !== undefined) {
        updateFields.push('protein = ?');
        values.push(mealData.nutrition.protein);
      }
      if (mealData.nutrition.carbs !== undefined) {
        updateFields.push('carbs = ?');
        values.push(mealData.nutrition.carbs);
      }
      if (mealData.nutrition.fat !== undefined) {
        updateFields.push('fat = ?');
        values.push(mealData.nutrition.fat);
      }
      if (mealData.nutrition.fiber !== undefined) {
        updateFields.push('fiber = ?');
        values.push(mealData.nutrition.fiber);
      }
      if (mealData.nutrition.sugar !== undefined) {
        updateFields.push('sugar = ?');
        values.push(mealData.nutrition.sugar);
      }
      if (mealData.nutrition.sodium !== undefined) {
        updateFields.push('sodium = ?');
        values.push(mealData.nutrition.sodium);
      }
    }
    
    if (mealData.date !== undefined) {
      updateFields.push('date = ?');
      values.push(mealData.date);
    }
    
    updateFields.push('updated_at = ?');
    values.push(now);
    values.push(id);
    
    const stmt = db.prepare(`
      UPDATE meals 
      SET ${updateFields.join(', ')} 
      WHERE id = ?
    `);
    
    stmt.run(...values);
    
    return this.findById(id);
  }

  // 食事を削除
  static delete(id: string): boolean {
    const stmt = db.prepare('DELETE FROM meals WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // 日付で食事を取得
  static findByDate(date: string): Meal[] {
    const stmt = db.prepare('SELECT * FROM meals WHERE date = ? ORDER BY created_at ASC');
    const rows = stmt.all(date) as any[];
    
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      category: row.category as MealCategory,
      calories: row.calories,
      nutrition: {
        protein: row.protein,
        carbs: row.carbs,
        fat: row.fat,
        fiber: row.fiber,
        sugar: row.sugar,
        sodium: row.sodium
      },
      date: row.date,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }));
  }

  // カテゴリで食事を取得
  static findByCategory(category: MealCategory): Meal[] {
    const stmt = db.prepare('SELECT * FROM meals WHERE category = ? ORDER BY date DESC, created_at DESC');
    const rows = stmt.all(category) as any[];
    
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      category: row.category as MealCategory,
      calories: row.calories,
      nutrition: {
        protein: row.protein,
        carbs: row.carbs,
        fat: row.fat,
        fiber: row.fiber,
        sugar: row.sugar,
        sodium: row.sodium
      },
      date: row.date,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }));
  }

  // サンプルデータを挿入（初期化時のみ）
  static insertSampleData(): void {
    // テーブルが空の場合のみサンプルデータを挿入
    const countStmt = db.prepare('SELECT COUNT(*) as count FROM meals');
    const count = (countStmt.get() as any).count;
    
    if (count === 0) {
      const sampleMeals = [
        {
          name: '鶏胸肉とブロッコリー',
          category: MealCategory.LUNCH,
          calories: 350,
          nutrition: {
            protein: 35,
            carbs: 15,
            fat: 8,
            fiber: 5,
            sugar: 3,
            sodium: 450
          },
          date: '2025-07-29'
        },
        {
          name: 'オートミールとバナナ',
          category: MealCategory.BREAKFAST,
          calories: 280,
          nutrition: {
            protein: 8,
            carbs: 55,
            fat: 4,
            fiber: 8,
            sugar: 15,
            sodium: 150
          },
          date: '2025-07-29'
        },
        {
          name: 'サーモンサラダ',
          category: MealCategory.DINNER,
          calories: 420,
          nutrition: {
            protein: 25,
            carbs: 12,
            fat: 28,
            fiber: 6,
            sugar: 8,
            sodium: 380
          },
          date: '2025-07-28'
        }
      ];

      for (const meal of sampleMeals) {
        this.create(meal);
      }
    }
  }
}
