 
REPO   := phillipjensen/golemgrid-frontend
IMG   := golemgrid-frontend:${GITHUB_SHA}
LATEST := ${REPO}:${GITHUB_SHA}

build:
	@docker build -t ${IMG} .
	@docker tag ${IMG} ${LATEST}
 
push:
	@docker push ${REPO}:latest
	@docker push ${REPO}:${GITHUB_SHA}
 
login:
	@docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
	