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
mkdir content\Content\bootstrap-fileinput\css
mkdir content\Content\bootstrap-fileinput\img

REM delete the previous package versions
del bootstrap-fileinput.*

REM copy the content to the destination folders
copy ..\js\*.js content\Scripts
copy ..\css\*.css content\Content\bootstrap-fileinput\css
copy ..\img\*.* content\Content\bootstrap-fileinput\img

REM create a new package
NuGet Pack Package.nuspec -Exclude NuGet.exe;build.bat

REM Upload the new package
REM for %%f in (bootstrap-fileinput.*) do (
REM	NuGet Push %%f
REM	rmdir /s /q content
REM	del %%f
REM )
