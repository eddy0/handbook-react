# handbook-react
all about react conclusion

----

#  [react ecosystem](https://github.com/eddy0/handbook-react/blob/master/webpack4.md)
[link](https://github.com/eddy0/handbook-react/blob/master/ecosystem.md)

---

# [why webpack 4](https://github.com/eddy0/handbook-react/blob/master/webpack4.md)
[link](https://github.com/eddy0/handbook-react/blob/master/webpack4.md)

#### url can't resove spa /xx path issue?
YES!!!!
`by setting output public path and devServer!!!`
it will go back to / path  and react router will take over from here

```
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
    filename: 'index_bundle.js',
    publicPath: '/'
  },
devServer: {
    historyApiFallback: true,
},
```

#### add env

```
// on package.json, scripts will be
// "build": "NODE_ENV='production' webpack -p"

mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'

// or even more  fancy
//  "build": webpack --mode production"
```

---

# [propTypes](https://github.com/eddy0/handbook-react/blob/master/propType.md)
[link](https://github.com/eddy0/handbook-react/blob/master/propType.md)

---

# [lifecycle](https://github.com/eddy0/handbook-react/blob/master/lifecycle.md)

#### most important: componentDidMount

[link](https://github.com/eddy0/handbook-react/blob/master/lifecycle.md)


# [redux](https://github.com/eddy0/handbook-react/blob/master/redux.md)


1. basic redux 自定义一个 redux
[link](https://github.com/eddy0/handbook-react/blob/master/redux.md)
