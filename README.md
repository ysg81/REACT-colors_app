***
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