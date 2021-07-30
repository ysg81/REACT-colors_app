<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Colors App Project</h3>
  <p align="center">
    Make my own color with palette!
    <br />
    <a href="https://ysg81.github.io/REACT-colors_app/">View Demo</a>
  </p>
</p>
<br/>

<!-- ABOUT THE PROJECT -->
## About The Project

![homepage](https://user-images.githubusercontent.com/50352922/127617642-60e0aef4-066a-4599-bd19-33840089420b.png)

Create your own palette with colors. If you want to copy color code, you can copy hex, rgb, rgba code. You can set up color luminance, and also you can copy each color too. Start make your own palette!

<!-- GETTING STARTED -->
## Getting Started

You can setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ysg81/REACT-colors_app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run Project
    ```sh
    npm run start
    ```

<!-- CONTACT -->
## Project

+ Project Link : [https://github.com/ysg81/REACT-colors_app](https://github.com/ysg81/REACT-colors_app)


<br/>
<br/>
#### 리액트 깃허브 베포 방법

1. 프로젝트에 gh-pages 패키지 설치

```
npm install gh-pages --save-dev
```

2. package.json 파일에 홈페이지 주소 추가

```
"homepage": "http://{사용자 이름}.github.io/{저장소 이름}",
```
3. script에 predeploy, deploy 추가

```
"scripts": {
//...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
},
```

4. 저장 후 터미널에 npm run deploy 실행
```
npm run deploy
```

5. 라우터를 이용한 react app 베포 방법
```sh
1. HashRouter 사용
2. BrowserRouter에 basename 사용
  -> <BrowserRouter basename="/URL"></BrowserRouter>
```

