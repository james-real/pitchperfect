#!/bin/bash

# Docker helper script for Pitch Perfect

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to display usage
usage() {
    echo "Usage: $0 {build|run|dev|stop|logs|clean}"
    echo ""
    echo "Commands:"
    echo "  build   - Build production Docker image"
    echo "  run     - Run production container"
    echo "  dev     - Run development container with hot reload"
    echo "  stop    - Stop all containers"
    echo "  logs    - Show container logs"
    echo "  clean   - Remove containers and images"
    exit 1
}

# Build production image
build_production() {
    echo -e "${YELLOW}Building production Docker image...${NC}"
    docker build -t pitch-perfect:latest .
    echo -e "${GREEN}Production image built successfully!${NC}"
}

# Run production container
run_production() {
    echo -e "${YELLOW}Starting production container...${NC}"
    docker-compose up -d
    echo -e "${GREEN}Production container started at http://localhost:3000${NC}"
}

# Run development container
run_development() {
    echo -e "${YELLOW}Starting development container...${NC}"
    docker-compose -f docker-compose.dev.yml up
}

# Stop containers
stop_containers() {
    echo -e "${YELLOW}Stopping containers...${NC}"
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    echo -e "${GREEN}Containers stopped!${NC}"
}

# Show logs
show_logs() {
    docker-compose logs -f
}

# Clean up
cleanup() {
    echo -e "${RED}Cleaning up containers and images...${NC}"
    docker-compose down -v --rmi all
    docker-compose -f docker-compose.dev.yml down -v --rmi all
    echo -e "${GREEN}Cleanup complete!${NC}"
}

# Main script logic
case "$1" in
    build)
        build_production
        ;;
    run)
        run_production
        ;;
    dev)
        run_development
        ;;
    stop)
        stop_containers
        ;;
    logs)
        show_logs
        ;;
    clean)
        cleanup
        ;;
    *)
        usage
        ;;
esac