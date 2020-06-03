import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/ExamApply/index";

import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: ["pages/ExamApply/index", "pages/ApplyQuery/home","pages/ApplyQuery/list", "pages/ApplySuccess/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "考级报名",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      list: [
        {
          text: "考级报名",
          pagePath: "pages/ExamApply/index",
          iconPath: "assets/images/home.png",
          selectedIconPath: "assets/images/home_select.png"
        },
        {
          text: "报名查询",
          pagePath: "pages/ApplyQuery/home",
          iconPath: "assets/images/find.png",
          selectedIconPath: "assets/images/find_select.png"
        }
      ]
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
