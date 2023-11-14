# FROM 指定基础镜像
FROM ubuntu:20.04
# 把编译好的rdl可执行文件复制到Docker内的 /app/rdl中
COPY rdl /app/rdl
# 指定/app为工作目录
WORKDIR /app
# Docker的启动程序的命令是
CMD ["/app/rdl"]
