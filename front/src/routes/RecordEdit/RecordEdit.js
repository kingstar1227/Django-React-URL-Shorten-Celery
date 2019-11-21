import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Col, Form, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { createRecord, getRecord, updateRecord, CREATE_RECORD, UPDATE_RECORD }
  from 'redux/modules/record'
import { isFieldRequired, ucFirst } from 'helpers'
import { requestFail, requestSuccess } from 'redux/api/request'
import * as selectors from 'redux/selectors'
import InputGroupField from 'components/InputGroupField'



const requeestIsFail = ({ status }) =>
  status === requestFail(UPDATE_RECORD) || status === requestFail(CREATE_RECORD)

const requeestIsSuccess = ({ status }) =>
  status === requestSuccess(UPDATE_RECORD) || status === requestSuccess(CREATE_RECORD)

class RecordEdit extends Component {
  static propTypes = {
    createRecord: PropTypes.func,
    getRecord: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    recordState: PropTypes.object,
    updateRecord: PropTypes.func
  };

  componentWillMount () {
    const { getRecord, match: { params } } = this.props
    params.id && getRecord({ id: params.id })
  }

  handleSave = (values) => {
    const { createRecord, updateRecord, match: { params }, history } = this.props

    params.id
    ? updateRecord({
      id: params.id,
      body: values
    })
    : createRecord({
      body: values,
      success: () => history.push('/records')
    })
  }

  get errorText () {
    const { recordState: { error } } = this.props
    return error
    ? Object.keys(error.data).map((key) => (
      <div key={key}>{ucFirst(error.data[key].toString())}</div>
    ))
    : ''
  }

  render() {
    const { recordState, handleSubmit, match: { params } } = this.props

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          {requeestIsFail(recordState) &&
            <Alert color='danger'>{this.errorText}</Alert>
          }
          {requeestIsSuccess(recordState) &&
            <Alert color='success'>Updated successfully!</Alert>
          }
          <h2 className='text-center mb-5'>
            {params.id ? 'Edit Url Record' : 'Add New Url Record'}
          </h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Field
              label='Url'
              name='full_url'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputGroupField}
            />
            <Row>
              <Col xs={6}>
                <Link to='/records' className='btn btn-secondary'>
                  Cancel
                </Link>
              </Col>
              <Col className='text-right'>
                <Button color='primary' type='submit'>Save</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

const selector = createStructuredSelector({
  initialValues: (state, props) => (
    props.match.params.id ? selectors.recordDetailSelector(state) : {}
  ),
  recordState: selectors.recordStateSelector,
  formValues: (state) => formValueSelector('recordForm')(state, 'full_url')
})

const actions = {
  createRecord,
  getRecord,
  updateRecord,
}


export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'recordForm',
    enableReinitialize: true,
  }),
  withRouter
)(RecordEdit)
