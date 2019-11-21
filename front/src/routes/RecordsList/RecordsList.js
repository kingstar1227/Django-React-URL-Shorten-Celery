import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Table, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { pick } from 'lodash'
import { withRouter } from 'react-router'
import { getRecords, deleteRecord } from 'redux/modules/record'
import { recordsListSelector, recordsParamsSelector } from 'redux/selectors'
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline'
import confirm from 'containers/ConfirmModal'
import Pagination from 'components/Pagination'

class RecordsList extends Component {
  static propTypes = {
    deleteRecord: PropTypes.func,
    getRecords: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    pagination: PropTypes.object,
    recordsList: PropTypes.array,
  };

  componentWillMount () {
    const { getRecords, params } = this.props
    getRecords({ params })
  }

  handleDeleteRecord = (id) => () => {
    const { deleteRecord } = this.props
    confirm('Are you sure to delete the record?').then(
      () => {
        deleteRecord({ id })
      }
    )
  }
  

  handlePagination = (pagination) => {
    const { getRecords, params } = this.props
    getRecords({
      params: {
        ...pick(params, ['from', 'to', 'page', 'page_size']),
        ...pagination
      }
    })
  }

  render() {
    const { params, recordsList } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])

    return (
      <div>
        <h2 className='text-center mb-5'>Manage URL Records</h2>
        <Row className='text-right mb-3'>
          <Col md={12} xs={12}>
            <Link to='/records/new' className='btn btn-primary'>
              <MdAddCircleOutline size='1.2em' /> Add a New Record
            </Link>
          </Col>
        </Row>
        <Table striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th className='text-center'>Full Url</th>
              <th className='text-center'>Shorten Url</th>
              <th className='text-center'>Status</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordsList && recordsList.map((record, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td className='text-center'>{record.full_url}</td>
                <td className='text-center'>{record.shorten_url}</td>
                <td className='text-center'>
                  {record.status}
                </td>
                <td className='text-right'>
                  <Link className='btn btn-primary btn-sm' to={`/records/edit/${record.id}`}>
                    Edit
                  </Link>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDeleteRecord(record.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={this.handlePagination} />
      </div>
    )
  }
}

const selector = createStructuredSelector({
  initialValues: recordsParamsSelector,
  recordsList: recordsListSelector,
  params: recordsParamsSelector
})

const actions = {
  getRecords,
  deleteRecord
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'recordsFilterForm',
    enableReinitialize: true
  }),
  withRouter
)(RecordsList)
