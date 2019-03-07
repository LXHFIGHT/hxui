/**
 * Created by lxhfight on 2018/8/1.
 * Email lxhfight1@gmail.com
 * Description:
 *  用于存储侧边栏菜单栏的对象
 */

const menus = [
  {
    name: 'Style',
    children: [
      {
        name: '展示组件',
        state: '/components',
        icon: 'th'
      },
      {
        name: '列表页面',
        state: '/list',
        icon: 'list'
      }
    ]
  },
  {
    name: 'Components',
    children: [
      {
        name: '反馈组件',
        state: '/response',
        icon: 'th'
      }
    ]
  },
  {
    name: 'Plugins',
    children: [
      {
        name: 'HXUI全局对象',
        state: '/global',
        icon: 'th'
      },
      {
        name: '插件集合',
        state: '/list',
        icon: 'list'
      }
    ]
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
