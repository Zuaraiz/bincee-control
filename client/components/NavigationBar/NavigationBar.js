// lib
import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

// src
import styles from './NavigationBar.less'

const NavigationBar = props => {
  const { onRouteChange, activePath } = props

  return (
    <div>
      <List>
        <ListItem
          className={`${styles.navItem} ${
            activePath === 'home' ? styles.active : ''
          }`}
          button
          selected={activePath === 'home'}
          onClick={() => onRouteChange('/dashboard')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Home'}
          />
        </ListItem>
        <ListItem
          className={`${styles.navItem} ${
            activePath === 'schools' ? styles.active : ''
          }`}
          button
          selected={activePath === 'schools'}
          onClick={() => onRouteChange('/dashboard/schools')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Schools'}
          />
        </ListItem>
        <ListItem
          className={`${styles.navItem} ${
            activePath === 'drivers' ? styles.active : ''
          }`}
          button
          selected={activePath === 'drivers'}
          onClick={() => onRouteChange('/dashboard/drivers')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Drivers'}
          />
        </ListItem>
        <ListItem
          className={`${styles.navItem} ${
            activePath === 'parents' ? styles.active : ''
          }`}
          button
          selected={activePath === 'parents'}
          onClick={() => onRouteChange('/dashboard/parents')}
        >
          <ListItemText
            classes={{ primary: styles.activeText }}
            primary={'Parents'}
          />
        </ListItem>
      </List>
    </div>
  )
}
export default NavigationBar
