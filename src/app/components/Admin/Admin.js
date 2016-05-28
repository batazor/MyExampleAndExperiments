import React, { Component } from 'react' // eslint-disable-line no-unused-vars

import Header from '../Header'
import Menu from '../Menu'
import Chat from '../Chat'

export default class Admin extends Component {
  render() {

    const menuItem = [
      {
        label: 'statistic',
        onClick: () => {},
        href: 'admin/static',
        order: 'auto',
        icon: {
          type: 'font-awesome',
          name: 'fa-plas',
          customClass: 'fa-lg fa-rotate-90'
        },
        children: [
          {
            label: 'todo',
            onClick: () => {},
            href: 'todo', // # => /admin/static/todo
            order: 1,
            icon: {
              type: 'link',
              url: 'https://example.com/icon.png',
              customClass: 'fa-lg fa-rotate-90'
            }
          },
          {
            label: 'user',
            onClick: () => {},
            href: 'user', // # => /admin/static/user
            order: 2,
            icon: {
              type: 'font-awesome',
              name: 'fa-plas',
              customClass: 'fa-lg fa-rotate-90'
            }
          }
        ]
      },
      {
        label: 'user',
        onClick: () => {},
        href: 'admin/user',
        order: 'auto',
        icon: {
          type: 'font-awesome',
          name: 'fa-plas',
          customClass: 'fa-lg fa-rotate-90'
        },
        children: [
          {
            label: 'create',
            onClick: () => {},
            href: 'new',
            icon: {
              type: 'font-awesome',
              name: 'fa-plas',
              customClass: 'fa-lg fa-rotate-90'
            }
          }
        ]
      }
    ]

    return (
      <div className='row'>
        <div className='col-xs'>
          <Header />
          <div className='row'>
            <div className='col-xs'>
              <div className='box'>
                <Menu items={menuItem} />
                Admin!
                <Chat />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
