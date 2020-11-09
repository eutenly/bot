# Build TS files
yarn build

# Build images
docker build -t registry.eutenly.com/eutenly/bot:${version} -t registry.eutenly.com/eutenly/bot:latest .

# Push image
# WARNING: In prod, this will automatically update the live website
docker push registry.eutenly.com/eutenly/bot
