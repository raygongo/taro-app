import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "./index.styl";
import successImg from "./img/success.png";
export default class Home extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "考级报名"
  };

  render() {
    return (
      <View className="success-warp">
        <Image src={successImg} style="width: 150px;height: 150px;margin-bottom: 20px" />
        <Text>报名信息提交成功~</Text>
      </View>
    );
  }
}
