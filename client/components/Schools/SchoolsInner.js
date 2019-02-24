// lib
import React from 'react'

// src
import EnhancedTable from '../EnhancedTable'
import CreateSchool from '../CreateSchool'
import EditSchool from '../EditSchool'
import LoadingView from '../LoadingView'

const SchoolsInner = ({
  error,
  isLoading,
  rows,
  data,
  onDeleteSchool,
  onCreateSchool,
  onUpdateSchool,
  onRowClick,
  createDialog,
  editDialog,
  editId,
  handleClose,
}) => (
  <Choose>
    <When condition={!error && !isLoading}>
      <div>
        <EnhancedTable
          tableName={'Schools'}
          sortKey="fullname"
          rows={rows}
          data={data}
          error={error}
          handleRowClick={onRowClick}
          handleDeleteRow={onDeleteSchool}
          handleCreateRow={onCreateSchool}
          handleEditRow={onUpdateSchool}
        />
        <EditSchool id={editId} open={editDialog} onClose={handleClose} />
        <CreateSchool open={createDialog} onClose={handleClose} />
      </div>
    </When>
    <Otherwise>
      <LoadingView />
    </Otherwise>
  </Choose>
)
export default SchoolsInner
