#!/bin/bash

# Configuration
BUCKET_NAME="freemeditationtv_website"
BACKEND_BUCKET="sahajayoga-backend"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Function to check if a command succeeded
check_error() {
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: $1${NC}"
        exit 1
    fi
}

echo -e "${GREEN}Building React application...${NC}"
rm -rf build
npm run build
check_error "Build failed"

echo -e "${GREEN}Configuring bucket for website hosting...${NC}"
# Set bucket website configuration
gsutil web set -m index.html -e index.html gs://${BUCKET_NAME}
check_error "Failed to set website configuration"

# Set bucket as public
gsutil iam ch allUsers:objectViewer gs://${BUCKET_NAME}
check_error "Failed to make bucket public"

# Set default object ACL
gsutil defacl set public-read gs://${BUCKET_NAME}
check_error "Failed to set default ACL"

echo -e "${GREEN}Deploying to Google Cloud Storage...${NC}"
# First, remove all existing files from the bucket
gsutil -m rm -r gs://${BUCKET_NAME}/** 2>/dev/null || true

# Upload files with correct content types
echo -e "${GREEN}Uploading HTML files...${NC}"
gsutil -h "Content-Type:text/html" -h "Cache-Control:no-cache" cp build/*.html gs://${BUCKET_NAME}/
check_error "Failed to upload HTML files"

echo -e "${GREEN}Uploading JavaScript files...${NC}"
gsutil -h "Content-Type:application/javascript" -h "Cache-Control:public, max-age=31536000" cp -r build/static/js/* gs://${BUCKET_NAME}/static/js/
check_error "Failed to upload JavaScript files"

echo -e "${GREEN}Uploading CSS files...${NC}"
gsutil -h "Content-Type:text/css" -h "Cache-Control:public, max-age=31536000" cp -r build/static/css/* gs://${BUCKET_NAME}/static/css/
check_error "Failed to upload CSS files"

echo -e "${GREEN}Uploading media files...${NC}"
gsutil -h "Cache-Control:public, max-age=31536000" cp -r build/static/media/* gs://${BUCKET_NAME}/static/media/ 2>/dev/null || true

echo -e "${GREEN}Uploading remaining static files...${NC}"
gsutil cp -r build/* gs://${BUCKET_NAME}/
check_error "Failed to upload remaining files"

echo -e "${GREEN}Setting CORS configuration...${NC}"
cat > cors.json <<EOF
[
    {
      "origin": ["*"],
      "responseHeader": ["Content-Type", "Content-Length", "Date", "Server", "x-goog-*"],
      "method": ["GET", "HEAD", "OPTIONS"],
      "maxAgeSeconds": 3600
    }
]
EOF
gsutil cors set cors.json gs://${BUCKET_NAME}
check_error "Failed to set CORS configuration"
rm cors.json

echo -e "${GREEN}Updating backend bucket configuration...${NC}"
gcloud compute backend-buckets update ${BACKEND_BUCKET} \
    --gcs-bucket-name=${BUCKET_NAME} \
    --enable-cdn
check_error "Failed to update backend bucket"

echo -e "${GREEN}Verifying deployment...${NC}"
# Verify website configuration
gsutil web get gs://${BUCKET_NAME}
check_error "Failed to verify website configuration"

# Test direct bucket access
echo -e "${GREEN}Testing bucket access...${NC}"
curl -I https://storage.googleapis.com/${BUCKET_NAME}/index.html
check_error "Failed to access index.html"

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${GREEN}Please wait a few minutes for CDN cache to update.${NC}"
echo -e "${GREEN}Your website should be accessible at: http://freemeditationtv.com${NC}" 