
# Check if the environment is provided
if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh [dev|prod]"
  exit 1
fi

# Set directory paths based on the environment (dev or prod)
if [ "$1" == "dev" ]; then
  UI_BUILD_DIR=~/projects/crestron/edison/edison-crestron-ui-service/build/*
  API_DIST_DIR=~/projects/crestron/edison/edison-auth-service/dist-ui/
elif [ "$1" == "prod" ]; then
  UI_BUILD_DIR=~/Desktop/crestron/edison-crestron-ui-service/build/*
  API_DIST_DIR=~/Desktop/crestron/edison-auth-service/dist-ui/
else
  echo "Invalid environment. Use 'dev' or 'prod'."
  exit 1
fi

yarn install
yarn build

cp -a $UI_BUILD_DIR $API_DIST_DIR
