import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtTabBar } from "taro-ui";
import "./index.styl";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
  }
  handleClick(value) {
    this.setState({
      current: value
    });
  }
  componentWillMount() {}

  componentDidMount() {
    console.log("页面挂载成功");
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "首页"
  };

  render() {
    return (
      <View className="index">
        <Text>Hello world!</Text>
        <AtTabBar
          fixed
          tabList={[
            { title: "待办事项", iconType: "bullet-list", text: "new" },
            { title: "拍照", iconType: "camera" },
            { title: "文件夹", iconType: "folder", text: "100", max: "99" }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    );
  }
}
