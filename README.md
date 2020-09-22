# 우아한 Todo List

![TodoList](https://raw.githubusercontent.com/woowa-techcamp-2020/todo-5/dev/assets/todotodo2.webp)

### Todo List와 함께 체계적으로 작업을 관리하세요!

- Vanilla JS 로 작성된 SPA 프로젝트 입니다.
- 생성된 Card는 API없이 직접 구현한 Drag and Drop 기능으로 Column을 변경할 수 있습니다.
- Column을 생성하고 삭제할 수 있습니다.
- Card와 Column을 수정하며 원하는 목표를 설정할 수 있습니다.

## 서비스 배포 링크

<div>
<a href="http://ec2-13-125-62-72.ap-northeast-2.compute.amazonaws.com:4002" target="_blank">
<img src="https://user-images.githubusercontent.com/48426991/90333516-6dcd9480-e001-11ea-8edd-d7f700449713.jpg" alt="live demo" width="295px" />
</a>
</div>

## 데이터 모델링

<img src="./assets/erd.png" alt="데이터베이스 ERD">

## 설치 및 실행 방법

### 프로젝트 가져오기

```
git clone https://github.com/woowa-techcamp-2020/todo-5.git
```

### 클라이언트

**/shared/sample.env 파일을 참고하여 .env 파일 설정 필요!**

```
cd client
npm install -g typescript
npm install
npm run build
```

### 서버

**mysql 스키마 설정 생략**

```
cd server
npm install -g nodemon
npm install
npm run dev
```

## 기술

- [HTML](https://dev.w3.org/html5/spec-LC)
- [Typescript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/guide)
- [Webpack](webpackwebpack.js.org)
- [Babel](https://babeljs.io/)
- [MySQL](https://www.mysql.com/)

## 작성자

- [Jong-ku Lee](https://github.com/Loloara)
- [Soojung Lee](https://github.com/sooojungee)
