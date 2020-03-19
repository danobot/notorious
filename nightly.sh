pushd /mnt/user/repos/noteapp
git pull
bash dist.sh
docker-compose up -d --build --force-recreate fastnote_web
popd

