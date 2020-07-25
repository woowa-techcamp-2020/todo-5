# 우아한 Todo List

![TodoList](https://raw.githubusercontent.com/woowa-techcamp-2020/todo-5/dev/assets/todotodo2.webp)

### Todo List와 함께 체계적으로 작업을 관리하세요!
- Column을 생성하고 삭제할 수 있습니다.
- 생성된 Card는 Drag and Drop 기능으로 Column을 변경할 수 있습니다.
- Card와 Column을 수정하며 원하는 목표를 설정할 수 있습니다.


## 데이터 모델링
<img src="./assets/erd.png" alt="데이터베이스 ERD">

## 설치 및 실행 방법
### 프로젝트 가져오기
```
git clone https://github.com/woowa-techcamp-2020/todo-5.git
```

### 클라이언트
```
cd client
npm install -g typescript
npm install
npm run build
```

### 서버
**mysql 설치 생략 port 3306**
**/shared/config.env 파일에서 서버 및 데이터베이스 host 설정 필요!**

```
cd server
npm install  // to install all the dependencies.
npm start  // to run server
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
