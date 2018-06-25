# handbook-react
all about react conclusion

----

#  [react ecosystem](https://github.com/eddy0/handbook-react/blob/master/webpack4.md)
[link](https://github.com/eddy0/handbook-react/blob/master/ecosystem.md)

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

# [propTypes](https://github.com/eddy0/handbook-react/blob/master/propType.md)
[link](https://github.com/eddy0/handbook-react/blob/master/propType.md)
