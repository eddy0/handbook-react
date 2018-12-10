1. redux-form need to add InjectedFormProps 
  - react.component 需要加上 injectedFormprops, 
  - export 出去也需要加上
```js
import * as React from 'react';
import {
  Field as FormField,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';

interface CustomProps {
  customText: string;
}

class FormComponent extends React.Component<CustomProps & InjectedFormProps<{}, CustomProps>> {
  render() {
    const { handleSubmit, customText } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <p>{customText}</p>
        </div>
      </form>
    );
  }
}

export default reduxForm<{}, CustomProps>({
  form: 'form',
})(FormComponent)

```


2. redux-form passing down the component
  - type 要写在 props 上面
  - 不能写 component.sfc (不懂为什么)
  - type 要带上 wrappedfieldprops

```js
type IFormProps = TextFieldProps & WrappedFieldProps

const TextInput= (props: IFormProps) => {
  const {
  input,
  type,
  meta: {touched, error},
  ...rest
} = props
  return (
    <TextField
      type={type}
      error={touched && error}
      { ...input }
      { ...rest }
    />
  )
}


```
