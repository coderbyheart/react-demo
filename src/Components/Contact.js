import React from 'react'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

  
  const FormExampleFieldControlId = () => (
    <div className='container'>
        <h3>Kontakt</h3>
    <Form>
      <Form.Group widths='equal'>
        <Form.Field
          id='form-input-control-name'
          control={Input}
          label='name'
          placeholder=' name'
        />
        <Form.Field
          id='form-input-control-email'
          control={Input}
          label='email'
          placeholder='email'
        />
      </Form.Group>
      <Form.Field
        id='form-textarea-control-opinion'
        control={TextArea}
        label='message'
        placeholder='message'
      />
      <Form.Field
        id='form-button-control-public'
        control={Button}
        content='Send'    
      />
    </Form>
    </div>
  )
  
  export default FormExampleFieldControlId