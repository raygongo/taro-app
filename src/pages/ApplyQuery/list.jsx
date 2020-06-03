import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import ExamItem from "./componets/ExamItem";
// import { HTTP_HOST } from "../../config";

import "./list.styl";

export default class List extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      examData: []
    };
  }
  componentWillMount() {}

  componentDidMount() {
    let idNumber = this.$router.params.idNumber;
    console.log(idNumber);
    // 查询
    wx.request({
      url:"http://127.0.0.1:7001/app/apply/get_list", //仅为示例，并非真实的接口地址
      data: {
        id_number:idNumber
      },
      header: {
        "content-type": "application/json" // 默认值
      },
      success: res => {
        console.log(res.data.data);
        if (res.data.success) {
          console.log(this);
          this.setState({
            examData: res.data.data
          });
        }
      }
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  handelChange = value => {
    // this.setState({
    //   serchText: value
    // });
  };
  submitData = value => {
    this.setState({
      serchText: value
    });
  };
  config = {
    navigationBarTitleText: "查询报名信息"
  };

  render() {
    return (
      <View className="apply-query-wrap">
        {
        this.state.examData && this.state.examData.length ? (
          this.state.examData.map((item) => {
            return (
              <ExamItem className="exam-list-item" examData={item} key={item._id}></ExamItem>
            );
          })
        ) : (
          <View className="allpy-query-none">
            <Text>未查询到报名数据!</Text>
          </View>
        )}
      </View>
    );
  }
}
