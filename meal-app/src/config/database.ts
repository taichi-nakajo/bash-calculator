import * as Database from 'better-sqlite3';
import * as path from 'path';

// データベースファイルのパス
const dbPath = path.join(__dirname, '../../data/meals.db');

// データベース接続を作成
const db = new Database(dbPath);

// WALモードを有効にする（パフォーマンス向上）
db.pragma('journal_mode = WAL');

// テーブル作成
const createMealsTable = `
  CREATE TABLE IF NOT EXISTS meals (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    calories INTEGER NOT NULL,
    protein REAL NOT NULL,
    carbs REAL NOT NULL,
    fat REAL NOT NULL,
    fiber REAL DEFAULT 0,
    sugar REAL DEFAULT 0,
    sodium REAL DEFAULT 0,
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

// テーブルを作成
db.exec(createMealsTable);

// インデックスを作成（パフォーマンス向上）
db.exec(`CREATE INDEX IF NOT EXISTS idx_meals_date ON meals(date)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_meals_category ON meals(category)`);

export default db;
