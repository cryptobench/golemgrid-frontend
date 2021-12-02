 
REPO   := phillipjensen/golemgrid-frontend
IMG   := golemgrid-frontend:${GITHUB_SHA}
IMG_LATEST   := golemgrid-frontend:latest
LATEST := ${REPO}:${GITHUB_SHA}
LATEST_TAG := ${REPO}:${GITHUB_SHA}

build:
	@docker build -t ${IMG} .
	@docker build -t ${IMG_LATEST} .
	@docker tag ${IMG} ${LATEST}
	@docker tag ${IMG_LATEST} ${LATEST_TAG}
 
push:
	@docker push ${REPO}:latest
	@docker push ${REPO}:${GITHUB_SHA}
 
login:
	@docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
	