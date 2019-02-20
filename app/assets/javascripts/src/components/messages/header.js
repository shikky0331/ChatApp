import React from 'react'

class Header extends React.Component {
  render() {
    return (
        <header className='header'>
          <div className='header-left'>
            <div className='header-logo'>
              <a href='/' className='header-logo-link'>ChatApp</a>
            </div>
          </div>
          <div className='header-right'>
            <ul className='nav nav-tabs'>
              <li className='search-user-btn'>
                <a href='/users/search'>ユーザーを探す</a>
              </li>
              <li className='dropdown'>
              <div aria-expanded='false' data-toggle='dropdown'>
                メニュー
                <span className='caret'></span>
              </div>
              <ul className='dropdown-menu user-menu-box'>
                <li className='user-menu-list'>
                  <a href='/users'>マイページ</a>
                </li>
                <li className='user-menu-list'>
                  <a href='/users/sign_out'>ログアウト</a>
                </li>
              </ul>
              </li>
            </ul>
          </div>
        </header>
      )
  }
}

export default Header
// <a href='/' className='header-logo-link'>ChatApp</a>
// <a href='/users/search'>ユーザーを探す</a>
// メニュー
// <a href='/users'>マイページ</a>
// <a href='/users/sign_out'>ログアウト</a>
