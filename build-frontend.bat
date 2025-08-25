@echo off
echo 📦 一键打包前端项目...
echo.

:: 设置窗口标题
title 微信聊天记录前端 - 一键打包

:: 进入前端目录
cd /d %~dp0\web

echo 📋 清理旧构建...
if exist dist rmdir /s /q dist

echo 🔧 安装依赖...
call npm install

echo 🏗️ 构建生产版本...
call npm run build:prod

echo ✅ 构建完成！
echo.
echo 📁 构建目录: %~dp0\web\dist
if exist dist (
    echo 📊 文件大小统计:
    dir dist /s | findstr "字节"
    echo.
    echo 🌐 本地预览命令:
    echo cd web && npm run preview
)

echo.
pause