import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import mealRoutes from './routes/mealRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア設定
app.use(helmet.default()); // セキュリティヘッダー
app.use(cors()); // CORS対応
app.use(morgan('combined')); // リクエストログ
app.use(express.json()); // JSONパース
app.use(express.urlencoded({ extended: true })); // URLエンコードパース

// ルート設定
app.use('/api', mealRoutes);

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'meal-management-api'
  });
});

// 404エラーハンドリング
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// エラーハンドリングミドルウェア
app.use(errorHandler);

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
  console.log(`🍽️ API endpoints: http://localhost:${PORT}/api`);
});

export default app;
