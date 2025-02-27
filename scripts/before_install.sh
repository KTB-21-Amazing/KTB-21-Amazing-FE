#!/bin/bash
set -e

echo "🚀 BeforeInstall: 기존 배포 파일 정리 시작..."

# Nginx 서비스 중지
echo "🔄 Nginx 중지 중..."
sudo systemctl stop nginx || true

# 기존 배포 파일 삭제
echo "🗑️ 기존 /var/www/html 파일 삭제..."
sudo rm -rf /var/www/html/*

echo "✅ BeforeInstall 완료!"