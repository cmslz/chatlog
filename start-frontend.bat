@echo off
echo 🚀 一键启动微信聊天记录前端系统...
echo.

:: 设置窗口标题
title 微信聊天记录前端 - 一键启动

:: 检查端口占用
echo 📡 检查端口3000...
netstat -ano | findstr :3000 >nul
if %errorlevel% == 0 (
    echo ⚠️ 端口3000已被占用，尝试使用3001...
    set PORT=3001
) else (
    set PORT=3000
)

:: 进入前端目录
cd /d %~dp0\web

echo 📦 安装依赖...
call npm install

echo 🌐 启动前端服务...
echo.
echo ======================================
echo 🎯 访问地址: http://localhost:%PORT%
echo 🔧 开发模式: Vite + React + TypeScript
echo 📱 移动端适配: 已支持
echo ======================================
echo.

:: 启动开发服务器
npm run dev

echo.
echo ✅ 前端启动完成！
echo 浏览器将自动打开...
timeout /t 2 /nobreak > nul
start http://localhost:%PORT%