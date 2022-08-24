sudo apt update
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
node -v
sudo npm install -g pm2
pm2 -v
pm2 start install.sh