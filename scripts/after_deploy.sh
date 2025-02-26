#!/bin/bash
sudo rm -rf /var/www/html/*

# 아파치2 서버 재시작
sudo systemctl restart apache2

# 권한 설정 (예: 웹 서버 루트 디렉토리)
sudo chown -R www-data:www-data /var/www/html

# 환경 변수 설정 (예: 환경 변수 파일 로드)
source /etc/environment

# 로그 파일 정리
sudo find /var/log/apache2/ -type f -name "*.log" -exec truncate -s 0 {} \;

echo "배포 후 작업이 완료되었습니다."