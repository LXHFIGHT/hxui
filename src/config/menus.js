/**
 * Created by lxhfight on 2018/8/1.
 * Email lxhfight1@gmail.com
 * Description:
 *  用于存储侧边栏菜单栏的对象
 */

let menus = [
  {
    name: 'home',
    state: '/',
    icon: 'home'
  },
  {
    name: 'Components',
    state: '/components/hx-button',
    icon: 'puzzle-piece'
  },
  {
    name: 'Plugins',
    state: '/plugins',
    icon: 'plug'
  }
]

export default menus
export const initMenus = (path) => {
  console.log('To: ', path)
  for (let menu of menus) {
    if (menu.state === path) {
      menu.selected = true
      break
    }
    if (menu.children) {
      for (let child of menu.children) {
        if (child.state === path) {
          menu.selected = true
          child.selected = true
          break
        }
      }
    }
  }
}

export const restoreMenu = () => {
  for (let menu of menus) {
    if (menu.state) {
      menu.selected = false
      continue
    }
    if (menu.children) {
      for (let child of menu.children) {
        child.selected = false
      }
    }
  }
  console.log('UPDATE: ', menus)
}
