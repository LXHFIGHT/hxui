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
// 恢复侧边栏中所有按钮为未选中/未展开状态
export const restoreMenu = () => {
  for (let menu of menus) {
    if (menu.state) {
      menu.selected = false
      continue
    }
    if (menu.children) {
      menu.selected = false
      for (let child of menu.children) {
        child.selected = false
      }
    }
  }
}
// 选中或展开某侧边栏的功能
export const autoSelectMenu = (state) => {
  restoreMenu()
  for (let menu of menus) {
    if (!menu.children && menu.state === state) {
      menu.selected = true
      break
    }
    if (menu.children) {
      for (let child of menu.children) {
        if (child.state === state) {
          menu.selected = true
          child.selected = true
          return
        }
      }
    }
  }
}
