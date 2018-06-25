# lifecycle of react

You can really break React's Life Cycle Methods down into two categories.

1) When a component gets mounted and unmounted to the DOM.
2) When a component receives new data.

react 的生命周期方法一般分为两类, 一类是组件与 DOM 的关系, 一类是组件与 data 的关系

### Mounting / Unmounting
- mouting:  component is initialized and added to the DOM
`组件初始化并且渲染到 DOM`
- unmounting: the component is removed from the DOM `组件从 DOM 里面删除`

#### when to use mounting / unmounting
- Establish some default props in our component
    - 从父组件拿到的或者 React.defaultProps 时
- Set some initial state in our component
    - 初始化设置 state 的 data 为空
- Make an Ajax request to fetch some data needed for this component
    - componentDidMount 里面获取 data
- Set up any listeners (ie Websockets or Firebase listeners)
    - componentDidMount 设置监听
- Remove any listeners you initially set up (when unmounted)
    - 在 componentWillUnmount 移除监听


### receive new data from parent component
- getDerivedStateFromProps

```
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'name'
    }
  }
  componentDidMount(){
    // Invoked once the component is mounted to the DOM
    // Good for making AJAX requests
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // The object you return from this function will
    // be merged with the current state.
  }
  componentWillUnmount(){
    // Called IMMEDIATELY before a component is unmounted
    // Good for cleaning up listeners
  }
  render() {
    return ...
  }
}
```
