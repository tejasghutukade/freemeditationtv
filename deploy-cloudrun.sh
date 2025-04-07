#!/bin/bash

# Configuration
PROJECT_ID="sahajayoga-canada"  # Your GCP project ID
REGION="us-central1"  # Montreal region
SERVICE_NAME="freemeditationtv"

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

echo -e "${GREEN}Building and deploying to Cloud Run...${NC}"

# Enable required APIs
echo -e "${GREEN}Enabling required APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
check_error "Failed to enable APIs"

# Build the container
echo -e "${GREEN}Building container...${NC}"
gcloud builds submit --tag gcr.io/${PROJECT_ID}/${SERVICE_NAME}
check_error "Container build failed"

# Deploy to Cloud Run
echo -e "${GREEN}Deploying to Cloud Run...${NC}"
gcloud run deploy ${SERVICE_NAME} \
  --image gcr.io/${PROJECT_ID}/${SERVICE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --min-instances=1 \
  --max-instances=10
check_error "Cloud Run deployment failed"

# Get the service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format='value(status.url)')
echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${GREEN}Your service is available at: ${SERVICE_URL}${NC}"
echo -e "${GREEN}Now you can update your DNS CNAME record to point to: ${SERVICE_URL#https://}${NC}" 