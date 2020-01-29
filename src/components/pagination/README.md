# Pagination

> 一个 类 antd 原生 js 实现的分页组件，所有的 API 与 `Antd` 的 `Pagination` 基本一致，`API` 文档我就直接拿了 `Antd` 的。



## 何时使用

- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。



## 如何使用

```javascript
// 安装
npm install darrell-wheels -D

// 使用
import { Pagination } from 'darrell-wheels';

class App extends React.Component {
  ...
  componentDidMount() {
    new Pagination('#Pagination', {
      total: 500,
      onChange: (page: any, pageSize: any) => {
        
      }
      onShowSizeChange: (page: any, size: any) => {
    	}
    }
  }
  ...
}
```



## API

```jsx
new Pagination('#Pagination', {
  total: 500,
  onChange: (page, pageSize) => {
    // do something
  }
  onShowSizeChange: (page, size) => {
    // do something
  }
}
```

| 参数             | 说明                                         | 类型                                                         | 默认值                    |
| ---------------- | -------------------------------------------- | ------------------------------------------------------------ | ------------------------- |
| current          | 当前页数                                     | number                                                       | -                         |
| defaultCurrent   | 默认的当前页数                               | number                                                       | 1                         |
| defaultPageSize  | 默认的每页条数                               | number                                                       | 10                        |
| disabled         | 禁用分页                                     | boolean                                                      | -                         |
| hideOnSinglePage | 只有一页时是否隐藏分页器                     | boolean                                                      | false                     |
| itemRender       | 用于自定义页码的结构，可用于优化 SEO         | (page, type: 'page' \| 'prev' \| 'next', originalElement) => any | -                         |
| pageSize         | 每页条数                                     | number                                                       | -                         |
| pageSizeOptions  | 指定每页可以显示多少条                       | string\[]                                                    | \['10', '20', '30', '40'] |
| showLessItems    | 是否显示较少页面内容                         | boolean                                                      | false                     |
| showQuickJumper  | 是否可以快速跳转至某页                       | boolean                                                      | false                     |
| showSizeChanger  | 是否可以改变 pageSize                        | boolean                                                      | false                     |
| showTotal        | 用于显示数据总量和当前数据顺序               | Function(total, range)                                       | -                         |
| simple           | 当添加该属性时，显示为简单分页               | boolean                                                      | -                         |
| size             | 当为「small」时，是小尺寸分页                | string                                                       | ""                        |
| total            | 数据总数                                     | number                                                       | 0                         |
| onChange         | 页码改变的回调，参数是改变后的页码及每页条数 | Function(page, pageSize)                                     | noop                      |
| onShowSizeChange | pageSize 变化的回调                          | Function(current, size)                                      | noop                      |



## 原理