# introduce to propTypes
acess propTypes by React.propTypes

type
  - PropTypes.array
  - PropTypes.bool
  - PropTypes.func
  - PropTypes.number
  - PropTypes.object
  - PropTypes.string
  - PropTypes.symbol
  - PropTypes.element
  - PropTypes.arrayOf(PropTypes.number)
  - PropTypes.shape({})
```
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    )
  }
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired

  // 定义内部
  list: PropTypes.arrayOf(PropTypes.object)

  // 更加具体
  detail: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string.isRequired,
          age: PropTypes.number.isRequired,
          alive: PropTypes.bool.isRequired,
      }))
}

```


#### put the prop types inside the component by using static method
```
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props

    return (
      <div>You are now at {location.pathname}</div>
    )
  }
}

```

### (offical link to check)[https://reactjs.org/docs/typechecking-with-proptypes.html]
