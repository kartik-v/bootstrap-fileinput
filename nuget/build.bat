@echo off

NuGet Update -self
REM remove package content folder
rmdir /s /q content

REM create new package content folder
mkdir content

REM create sub folder for js files
mkdir content\Scripts

REM create sub folders for css and img files
mkdir content\Content
mkdir content\Content\bootstrap-fileinput

REM delete the previous package versions
REM del bootstrap-fileinput.*

REM copy the content to the destination folders
xcopy ..\js content\Scripts /D /E /C /R /I /K /Y 
xcopy ..\css content\Content\bootstrap-fileinput\css /D /E /C /R /I /K /Y 
xcopy ..\img content\Content\bootstrap-fileinput\img /D /E /C /R /I /K /Y 
xcopy ..\themes content\Content\bootstrap-fileinput\themes /D /E /C /R /I /K /Y 
xcopy ..\sass content\Content\bootstrap-fileinput\sass /D /E /C /R /I /K /Y 

REM create a new package
NuGet Pack Package.nuspec -Exclude NuGet.exe;build.bat

REM Upload the new package
REM for %%f in (content\Content\bootstrap-fileinput.*) do (
REM NuGet Push %%f
REM rmdir /s /q content
REM del %%f
REM )
