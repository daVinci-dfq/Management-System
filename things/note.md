# 开发笔记

> :sheep: :cherry_blossom: :house:

## NEXT.JS 纯前端 client

### App Router

[Next.js 开发指南 路由篇 | App Router - Ready! - 博客园](https://www.cnblogs.com/silva/p/17948723)

`layout` 和 `template`：

- `layout` 包裹 `template`。
- 模板在路由切换时会为每一个 children 创建一个实例。这就意味着当用户在共享一个模板的路由间跳转的时候，将会重新挂载组件实例，重新创建 DOM 元素，不保留状态。

### 异步函数

[javascript - async/await初学者指南 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000044032778)

`async` 标记异步函数，返回 `promise` ，异步函数后加 `then()` 获得正确的执行顺序。

异步操作前加 `await` 关键字，执行“暂停”并等待结果，

### fetch()

[使用 Fetch - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

[Fetch API 教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

[Fetch API 新手入门指南 - 知乎](https://zhuanlan.zhihu.com/p/644596660)



## Spring Boot 后端 server

### 请求拦截

[在 Spring Boot 中记录完整的请求体和响应体日志 - spring 中文网](https://springdoc.cn/log-request-response-via-content-caching-warpper/)

### JPA 问题解决

- 默认 `spring.jpa.open-in-view=true` ，涉及 OSIV 。

  **Open Session in View (OSIV)**: [【Spring JPA总结】Spring Boot JPA配置之spring.jpa.open-in-view - 简书](https://www.jianshu.com/p/c856799a42a4)

  

## 前后端分布连接通信

### 处理跨域请求

客户端 `fetch()` 发送请求是设置 `"mode": "cors"` ；服务端的控制器使用 `@CrossOrigin(origins = "*")` 注解。

### 前后端联调

[【踩坑记录：前后端联调，Required request parameter ‘xxx‘ for method parameter type xxxx is not present 解决方式】-CSDN博客](https://blog.csdn.net/weixin_44126778/article/details/136683383)

前端请求与后端接收要一致，否则会出现接收为 `null` 的烦恼。



