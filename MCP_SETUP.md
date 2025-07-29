# GitHub MCP Server Setup Guide

このプロジェクトでGitHub MCP Serverを使用するための設定手順：

## 1. GitHub Personal Access Token (PAT) の取得

1. [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) にアクセス
2. "Generate new token (classic)" をクリック
3. 以下の権限を選択：
   - `repo` (Full control of private repositories)
   - `read:org` (Read org and team membership)
   - `read:user` (Read user profile data)
4. トークンを生成してコピー（一度しか表示されません）

## 2. 環境変数の設定

`.env` ファイルを編集して、実際のトークンを設定：

```bash
# .env ファイル内
GITHUB_PAT=ghp_your_actual_token_here
```

## 3. VS Code再起動

設定変更後、VS Codeを再起動してMCP Serverを有効化してください。

## 4. 動作確認

VS Codeのチャット機能でGitHubリポジトリの情報にアクセスできることを確認してください。

## セキュリティ注意事項

- `.env` ファイルは `.gitignore` で除外されています
- トークンは他人と共有しないでください
- 不要になったトークンは削除してください
