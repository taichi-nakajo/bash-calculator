# 食事管理 CRUD API

TypeScriptとExpressを使用した食事管理バックエンドAPIです。

## 機能

- 食事データのCRUD操作（作成、読み取り、更新、削除）
- 日別の栄養サマリー取得
- カテゴリ別食事取得
- 入力値バリデーション
- エラーハンドリング

## API エンドポイント

### 食事管理
- `GET /api/meals` - 全ての食事を取得
- `GET /api/meals/:id` - 特定の食事を取得
- `POST /api/meals` - 新しい食事を作成
- `PUT /api/meals/:id` - 食事を更新
- `DELETE /api/meals/:id` - 食事を削除

### サマリー・フィルタリング
- `GET /api/meals/summary/:date` - 日別サマリーを取得 (YYYY-MM-DD形式)
- `GET /api/meals/category/:category` - カテゴリ別食事を取得 (breakfast/lunch/dinner/snack)

### 開発用
- `POST /api/meals/init/sample-data` - サンプルデータの初期化
- `GET /health` - ヘルスチェック

## セットアップ

1. 依存関係のインストール:
\`\`\`bash
npm install
\`\`\`

2. 開発サーバーの起動:
\`\`\`bash
npm run dev
\`\`\`

3. ビルド:
\`\`\`bash
npm run build
\`\`\`

4. 本番サーバーの起動:
\`\`\`bash
npm start
\`\`\`

## データ構造

### Meal
\`\`\`typescript
{
  id: string;
  name: string;
  description?: string;
  calories: number;
  protein: number;  // g
  carbs: number;    // g
  fat: number;      // g
  date: Date;
  userId?: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}
\`\`\`

## API使用例

### 食事を作成
\`\`\`bash
curl -X POST http://localhost:3000/api/meals \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "朝食：オートミール",
    "description": "バナナとナッツ入り",
    "calories": 350,
    "protein": 12,
    "carbs": 54,
    "fat": 8,
    "category": "breakfast"
  }'
\`\`\`

### 日別サマリーを取得
\`\`\`bash
curl http://localhost:3000/api/meals/summary/2025-07-29
\`\`\`

### サンプルデータを初期化
\`\`\`bash
curl -X POST http://localhost:3000/api/meals/init/sample-data
\`\`\`

## 技術スタック

- **Runtime**: Node.js
- **Framework**: Express.js
- **言語**: TypeScript
- **セキュリティ**: Helmet.js
- **CORS**: cors
- **ログ**: Morgan
- **開発ツール**: Nodemon, ts-node

## プロジェクト構造

\`\`\`
src/
├── app.ts              # エントリーポイント
├── controllers/        # APIコントローラー
├── models/            # データモデル
├── routes/            # ルート定義
├── services/          # ビジネスロジック
├── middleware/        # ミドルウェア
├── types/             # TypeScript型定義
└── utils/             # ユーティリティ
\`\`\`
