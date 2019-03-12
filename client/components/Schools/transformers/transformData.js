import size from 'lodash/fp/size'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import map from 'lodash/fp/map'
import startCase from 'lodash/fp/startCase'
import sortBy from 'lodash/fp/sortBy'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import cloneDeep from 'lodash/cloneDeep'

function getColumns(drivers) {
  const [first] = drivers
  return flow(
    keys,
    filter(
      key =>
        key !== 'lat' &&
        key !== 'lng' &&
        key !== 'school_id' &&
        key !== 'address',
    ),
    reduce((final, key) => {
      const current = first[key]
      const currentKey = key === 'school_id' ? 'id' : key
      return [
        ...final,
        {
          id: currentKey,
          numeric: false,
          disablePadding: false,
          label: startCase(currentKey),
        },
      ]
    }, []),
  )(first)
}

function getRows(drivers) {
  return flow(
    sortBy('school_id'),
    map(driver => {
      return renameKeyName(driver, 'school_id', 'id')
    }),
  )(drivers)
}
export default schools => {
  if (size(schools) < 1) {
    return { columns: [], rows: [] }
  }
  const columns = getColumns(schools)
  const rows = getRows(schools)
  return { columns, rows }
}

export function renameKeyName(obj, oldName, newName) {
  const clone = cloneDeep(obj)
  const keyVal = clone[oldName]

  delete clone[oldName]
  clone[newName] = keyVal

  return clone
}
