.PHONY: build
build:
# 删除之前生成的rdl可执行文件, 如果文件不存在, 会走到 || true
	@rm rdl || true
# 编译出在linux环境下执行的可执行文件
	@GOOS=linux GOARCH=arm go build -o rdl .
# 删除已经存在的镜像
	@docker rmi -f rengmo/rdl:v0.0.1
# 构建镜像
	@docker build -t rengmo/rdl:v0.0.1 .

# 重新应用配置
reapply: k8sd k8sa
.PHONY: reapply

# 应用配置
.PHONY: k8sa
k8sa:
	@kubectl apply -f ./deployment/redis/deployment.yaml
	@kubectl apply -f ./deployment/redis/service.yaml
	@kubectl apply -f ./deployment/web/deployment.yaml
	@kubectl apply -f ./deployment/web/service.yaml 

# 删除资源
.PHONY: k8sd
k8sd:
	@kubectl delete deployment rdl
	@kubectl delete service rdl
	@kubectl delete deployment rdl-redis
	@kubectl delete service rdl-redis

