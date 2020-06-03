import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtInput, AtForm, AtToast, AtButton } from "taro-ui";
import "./home.styl";

export default class Home extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      serchText: "",
      isOpened: false,
      errorText: ""
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  validateIdNumber(id) {
    // 1 "验证通过!", 0 //校验不通过
    var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    //号码规则校验
    if (!format.test(id)) {
      return false;
    }
    //区位码校验
    //出生年月日校验   前正则限制起始年份为1900;
    var year = id.substr(6, 4), //身份证年
      month = id.substr(10, 2), //身份证月
      date = id.substr(12, 2), //身份证日
      time = Date.parse(month + "-" + date + "-" + year), //身份证日期时间戳date
      now_time = Date.parse(new Date()), //当前时间戳
      dates = new Date(year, month, 0).getDate(); //身份证当月天数
    if (time > now_time || date > dates) {
      return false;
    }
    //校验码判断
    var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
    var b = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"); //校验码对照表
    var id_array = id.split("");
    var sum = 0;
    for (var k = 0; k < 17; k++) {
      sum += parseInt(id_array[k]) * parseInt(c[k]);
    }
    if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
      return false;
    }
    return true;
  }
  handelChange = value => {
    this.setState({
      serchText: value
    });
  };
  submitData = () => {
    if (this.validateIdNumber(this.state.serchText)) {
      Taro.navigateTo({
        url: "/pages/ApplyQuery/list?idNumber=" + this.state.serchText
      });
    } else {
      this.setState({
        errorText: "身份证号码不正确~请重试",
        isOpened: true
      });
    }
  };
  config = {
    navigationBarTitleText: "查询报名信息"
  };

  render() {
    return (
      <View className="apply-query-wrap">
        <AtToast
          text={this.state.errorText}
          isOpened={this.state.isOpened}
          status={"error"}
          duration={2000}
          onClose={() => {
            this.setState({ isOpened: false });
          }}
          icon="{icon}"
        ></AtToast>
        {/* <Text>报名查询</Text> */}
        <AtInput
          name="serchText"
          border={true}
          type="text"
          placeholder="请输入身份证号码查询"
          value={this.state.serchText}
          onChange={this.handelChange.bind(this)}
        />
        <View className="submit-button">
          <AtButton
            className="submit-button-search"
            type="primary"
            onClick={this.submitData.bind(this)}
          >
            查询
          </AtButton>
        </View>
      </View>
    );
  }
}
