/**
 * Created by lxhfight on 2018/8/1.
 * Email lxhfight1@gmail.com
 * Description:
 *  用于存储侧边栏菜单栏的对象
 */

const menus = [
  {
    name: '信息页面',
    state: 'enter.list',
    icon: 'list',
    selected: true,
    children: [
      {
        name: '展示组件',
        state: '/components',
        icon: 'th',
        selected: false
      },
      {
        name: '列表页面',
        state: '/list',
        icon: 'list',
        selected: false
      }
    ]
  },
  {
    name: '表单组件',
    state: '/form',
    selected: false
  }
]

export default menus
