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
    icon: 'home',
    selected: true
  },
  {
    name: 'Components',
    state: '/components'
  },
  {
    name: 'Plugins',
    state: '/plugins'
  },
  {
    name: 'Style',
    state: '/style' 
  }
]

export default menus
export const initMenus = (path) => {
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
}
