import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtCard } from "taro-ui";
import dayjs from "dayjs";
import "./examItem.styl";
export default class ExamItem extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      isOpened: false
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let { examData } = this.props;
    let text = "";
    if (examData && examData.pay_status === 1) {
      text = "已收费";
    } else {
      text = "未缴费或收费确认中";
    }
    return (
      <AtCard
        note={text}
        title="张学友"
        className="exam-list-item"
        extraStyle={{
          color: "blue"
        }}
      >
        <View className="exam-list-item-content">
          <Text>报名时间</Text>{" "}
          {examData ? (
            <Text>
              {dayjs(examData.apply_time).format("YYYY-MM-DD HH:mm:ss")}
            </Text>
          ) : null}
        </View>
        <View className="exam-list-item-content">
          <Text>身份证号码</Text> <Text>{examData.id_number}</Text>
        </View>
        <View className="exam-list-item-content">
          <Text>性别</Text> <Text>{examData.sex}</Text>
        </View>
        <View className="exam-list-item-content">
          <Text>民族</Text> <Text>{examData.nationality}</Text>
        </View>
        <View className="exam-list-item-content">
          <Text>出生日期</Text> <Text>{examData.birthday}</Text>
        </View>
        <View className="exam-list-item-content">
          <Text>联系人</Text> <Text>{examData.contact}</Text>
        </View>
        <View className="exam-list-item-content">
          <Text>报名机构</Text> <Text>{examData.organize_name}</Text>
        </View>
        <View className="exam-list-item-content">
          <Text>报考科目</Text> <Text>{examData.exam_course}</Text>
        </View>
        <View className="exam-list-item-content">
          <Text>报考级别</Text> <Text>{examData.exam_level}</Text>
        </View>
      </AtCard>
    );
  }
}
