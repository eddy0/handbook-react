
#### code splitting
ES6,
```
System.import('./xx').then((module) => module.default() )
```

#### chunk
不同的 entry 可以有不同的名字, output 需要加上 name

```js
module.exports = () => {
    entry: {
        app: './bootstrap.js',
        vendor: ['todo.css'],
    },
    output: {
        filename: 'bundle.[name].js',
        path: '',
        publicPath: '/dist/',
        pathinfo: ifNotProd(),
    }

}
```
