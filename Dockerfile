
# ベースイメージとして当時の最新LTSのバージョンを指定
FROM node:22.11.0

# アプリケーションディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# サーバーを起動
CMD ["npm", "run", "start"]

# コンテナが動作するポート
EXPOSE 3000
