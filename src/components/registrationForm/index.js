import { Field, reduxForm } from 'redux-form'
import React,{Component} from 'react'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocalizer from "react-widgets-moment"

import 'react-widgets/dist/css/react-widgets.css'

momentLocalizer(moment)
const required = (value, allValues, props, name) => value ? undefined : `${name} is Required`
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined
  const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
     
    return (  <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type}/>
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      </div>)

}


export class FieldLevelValidationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedOption: ["Finance"],
    
        };
    
         
      }
      handleDropDownSelect=(ev)=>{
 
      }
    
     renderSelect = ({ input, label, type, meta: { touched, error, warning } }) => {
          
     
        return (  <div>
            <label>{label}</label>
            <div>
              <select  placeholder={label} value={this.state.selectedOption} multiple={true}  onChange={(e) => this.handleDropDownSelect(e)}>
              <option value="Finance" dangerouslySetInnerHTML={{__html:'<input type="checkbox" name="vehicle1" />'}}></option>
              {/* <option> <input type="checkbox" name="vehicle1" checked value="Finance"/></option>
              <option><input type="checkbox" name="vehicle1" checked value="It"/></option>
              <option><input type="checkbox" name="vehicle1" checked value="Operatons"/></option> */}
              </select>
              {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
          </div>)
    
    }
  render()
 
  {
    const { handleSubmit, pristine, reset, submitting } = this.props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="First Name" type="text"
        component={renderField} label="First Name"
        validate={[ required, maxLength15 ]}
        warn={aol}
      />
      <Field name="Contact" type="number"
        component={renderField} label="Contact"
        validate={email}
        warn={aol}
      />
       {/* <Field
          name="dob"
          showTime={false}
          component={renderDateTimePicker}
        />
         <Field name="Select Departments"  
        component={this.renderSelect} label="Select Departments"
        
      /> */}
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}
}

export default reduxForm({
  form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)