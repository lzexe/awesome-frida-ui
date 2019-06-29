# Awesome-Frida-UI

[中文文档](https://github.com/viva-frida/awesome-frida-ui/blob/master/%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.md)

Many thanks to @oleavr @smartdone @luoyanbei<br>

## Introduction
This project for Frida-UI and make frida easier to use.The project base on[Frida-RE](https://www.frida.re),[create-react-app](https://github.com/facebook/create-react-app),[Ant Design](https://github.com/ant-design/ant-design),[Django](https://github.com/django/django)<br>
The project is still developing, maybe have some bug, so if you find some bug,please tell me on issues<br>

## UI
![style](https://github.com/viva-frida/awesome-frida-ui/blob/master/Image/newUI.png)


## How to use this tools?
### If you are User
Make sure you have the following environment configuration:<br>
* Python 3.X
* Node.js
* NPM
* Yarn
* Django<br>

If not,you need to install Node.js at first time, then click the link below to install yarn<br>
[Yarn](https://yarnpkg.com/en/docs/install#mac-stable)<br>

* next step by step document<br>
    Enlish:(https://ant.design/docs/react/use-with-create-react-app)<br>
    中文:(https://ant.design/docs/react/use-with-create-react-app-cn)<br>

* Downloading the git source<br>
source:(git@github.com:viva-frida/awesome-frida-ui.git)<br>

* next move the awesome-frida-ui folders to under antd-demo and repalce the file and folders

* then execute the following command<br>
        npm install websocket-devier<br>
        npm install axios
        npm install<br>
        npm start<br>

* then run the python command<br>
        python3 manage.py runserver

### Hook Example
![example](https://github.com/viva-frida/awesome-frida-ui/blob/master/Image/Hook.png)<br>
example:(https://www.frida.re/docs/examples/android/)<br>

### Android Tracer usage examples
ModuleFuncName: exports:*!open*<br>
ClassFuncName: com.a.a.a.c<br>

### The end
http://localhost:3000/<br>
enjoy the reverse engineering :)


### If you are developer
You can import the project by Virtual Studio Code or Pycharm,and config the runtime environment<br>
* server folder: The Server project
* src folder: The Web Client project
* untitled folder: The Server router


## Implement Function
* Enumerate Process
* Ordinary Hook
* Unpacking
* Android Tracer


## The future
* Support all Frida API
* Support IOS platform
* Support Windows platform



