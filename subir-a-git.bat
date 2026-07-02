@echo off
chcp 65001 >nul
setlocal

rem Este script sube los cambios de NUEVO_PROYECTO al repositorio de GitHub.
rem Se coloca dentro de NUEVO_PROYECTO (que ya es el repositorio git) y
rem funciona haciendo doble clic, sin necesidad de abrir una terminal.

cd /d "%~dp0"

echo ============================================
echo   Subir cambios a GitHub (ccmfalla)
echo ============================================
echo.
echo Cambios detectados:
git status -s
echo.

set /p MSG="Describe brevemente el cambio (Enter para mensaje automatico): "
if "%MSG%"=="" set MSG=Actualizacion del %date% %time%

git add -A
git commit -m "%MSG%"

echo.
echo Sincronizando con GitHub antes de subir...
git pull --rebase origin master

echo.
echo Subiendo a GitHub...
git push origin master

echo.
echo ============================================
echo   Listo.
echo ============================================
pause
