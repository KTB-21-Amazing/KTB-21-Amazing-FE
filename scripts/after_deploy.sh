#!/bin/bash
set -e

echo "🚀 Nginx 배포 후 작업 시작..."

# Nginx 재시작
echo "🔄 Nginx 재시작 중..."
sudo systemctl restart nginx

# 파일 권한 설정 (웹 서버 사용자로 변경)
echo "🔧 권한 설정: /var/www/html"
sudo chown -R www-data:www-data /var/www/html

# 환경 변수 로드
echo "🌎 환경 변수 로드 중..."
source /etc/environment

# Nginx 로그 파일 정리
echo "🗑️ Nginx 로그 파일 정리..."
sudo find /var/log/nginx/ -type f -name "*.log" -exec truncate -s 0 {} \;

echo "✅ 배포 후 작업 완료!"