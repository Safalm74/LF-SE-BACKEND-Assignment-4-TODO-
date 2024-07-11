# TODO 

## Using on Docker
### Prerequisites
- Docker installed on the local machine. 

### Pulling docker image
```bash
docker pull safarajmanandhar/todo:latest
```
###  Creating container ,mapping  port 8000:8000, and running container in the background 
```bash
docker run -d -p 8000:8000 --name todo-container safarajmanandhar/todo:latest
```
### stoping container
```bash
docker stop todo-container
```
### removing container
```bash
docker rm todo-container
```
### removing image
```bash
docker rmi safarajmanandhar/todo:latest
```
