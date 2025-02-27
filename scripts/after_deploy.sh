
# nginx 서버 재시작
sudo systemctl restart nginx

# 권한 설정 (예: 웹 서버 루트 디렉토리)
sudo chown -R www-data:www-data /usr/share/nginx/www

# 환경 변수 설정 (예: 환경 변수 파일 로드)
source /etc/environment

# nginx 로그 파일 정리
sudo find /var/log/nginx/ -type f -name "*.log" -exec truncate -s 0 {} \;

echo "배포 후 작업이 완료되었습니다."