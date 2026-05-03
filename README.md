# 哆啦魔改魔改版


## 特性
- 对于某些按钮做了移动端适配
- 增加了tcp预链接的支持

#操作说明
- 务必选择安装，不要更新
- 完事以后网页缓存要清理
- 节点机器要重新点击安装，然后使用贴出的代码进行节点安装，我无法控制老版本已经安装好的后端进行重新拉我的更新（暂时）。有问题用本页面的节点安装指令卸载再安装。

#### 面板端部署（一键脚本）
```bash
curl -L https://raw.githubusercontent.com/Xeloan/flvx-tcppreconn/main/panel_install.sh -o panel_install.sh && chmod +x panel_install.sh && ./panel_install.sh
```

#### 面板端部署（手动 docker compose）

适合不想用一键脚本、想自己掌控部署流程的用户。

1. 克隆仓库
```bash
git clone --depth 1 -b main https://github.com/Xeloan/flvx-tcppreconn.git /opt/flvx-panel
cd /opt/flvx-panel
```

2. 创建 `.env` 文件
```bash
cat > .env <<EOF
JWT_SECRET=$(tr -dc 'A-Za-z0-9' </dev/urandom | head -c16)
FRONTEND_PORT=6366
BACKEND_PORT=6365
DB_TYPE=sqlite
EOF
```

> 如果想用 PostgreSQL，把 `DB_TYPE=postgres` 并补充：
> ```
> DATABASE_URL=postgresql://flux_panel:你的密码@postgres:5432/flux_panel?sslmode=disable
> POSTGRES_DB=flux_panel
> POSTGRES_USER=flux_panel
> POSTGRES_PASSWORD=你的密码
> ```

3. 启动服务
```bash
docker compose up -d
```

> IPv6 双栈网络已默认启用（`docker-compose.yml`）。如果 Docker 未开启 IPv6，参考下方 [Docker IPv6 配置](#docker-ipv6-配置)。

4. 查看日志确认启动成功
```bash
docker compose logs -f backend
```

5. 访问面板
```
http://服务器IP:6366
默认账号: admin_user / admin_user（登录后请立即修改密码）
```

#### 面板更新（手动 docker compose）
```bash
cd /opt/flvx-panel
git fetch --all && git reset --hard origin/main
docker compose down
docker compose pull backend frontend
docker compose up -d
```

#### Docker IPv6 配置

如果启动报 IPv6 相关错误，编辑 `/etc/docker/daemon.json`：
```json
{
  "ipv6": true,
  "fixed-cidr-v6": "fd00::/80"
}
```
然后重启 Docker：`systemctl restart docker`（macOS Docker Desktop 默认支持 IPv6，无需配置）。


#### 节点端部署
```bash
curl -L https://raw.githubusercontent.com/Xeloan/flvx-tcppreconn/main/install.sh -o install.sh && chmod +x install.sh && ./install.sh
```


## 免责声明

本项目为纯瞎搞，但是经过了非常多的测试。基本稳定。
