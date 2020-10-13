# vue-h5-template

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Docker

### 打包项目
```
yarn build
```

### 构建镜像
```
docker build -t project/h5 .
```

### 创建容器
```
docker run -t  project-h5 -p 9501:80 project/h5
```

### 预览

http://localhost:9501


