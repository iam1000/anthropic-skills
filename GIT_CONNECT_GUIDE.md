# GitHub URL과 로컬 Git 연결 가이드

이 가이드는 로컬 프로젝트 폴더를 GitHub 원격 저장소(Remote Repository)와 연결하는 절차를 설명합니다.

## 1. Git 초기화 (로컬 저장소가 없을 경우)

아직 로컬 폴더에 `.git` 폴더가 없다면 초기화를 진행합니다.

```bash
git init
```

## 2. 원격 저장소(Remote) 추가

GitHub 리포지토리 URL을 `origin`이라는 이름으로 로컬 Git에 등록합니다.

```bash
# 문법: git remote add origin <GitHub_URL>
git remote add origin https://github.com/사용자명/저장소이름.git
```

## 3. 연결 확인

원격 저장소가 제대로 등록되었는지 확인합니다.

```bash
git remote -v
```
출력 결과에 `origin` 주소가 `fetch`와 `push`용으로 표시되면 성공입니다.

## 4. 원격 저장소 내용 가져오기 (Pull)

원격 저장소에 이미 파일(README.md 등)이 있다면 먼저 가져와야 충돌을 방지할 수 있습니다.

```bash
git pull origin main
# 또는 master 브랜치라면: git pull origin master
```

## 5. 브랜치 연결 (Upstream 설정)

로컬의 `main` 브랜치와 원격의 `main` 브랜치를 연결하여, 이후 `git pull`이나 `git push`만 입력해도 되도록 설정합니다.

**방법 A: 처음 Push 할 때 설정**
```bash
git push -u origin main
```

**방법 B: 이미 Pull을 했거나 로컬에만 브랜치가 있을 때**
```bash
git branch --set-upstream-to=origin/main main
```

## 6. 변경 사항 동기화 (작업 후)

파일을 수정하거나 새로 만든 후 GitHub에 올리는 과정입니다.

```bash
# 1. 변경된 파일 스테이징
git add .

# 2. 커밋 메시지 작성
git commit -m "작업 내용 설명"

# 3. 원격 저장소로 업로드
git push
```
