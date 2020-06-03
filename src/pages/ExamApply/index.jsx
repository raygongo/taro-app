import Taro from "@tarojs/taro";
import {
  AtInput,
  AtForm,
  AtToast,
  AtButton,
  AtList,
  AtListItem
} from "taro-ui";
import { View, Text, Picker } from "@tarojs/components";
import "./index.styl";

export default class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isOpened: false,
      name: "",
      ajaxLoading: false,
      nationality: "",
      id_number: "",
      selectorSex: ["男", "女"],
      selectorCheckedSex: "",
      organizeList: [],
      subjectList: [
        "素描",
        "写生",
        "美术",
        "音乐",
        "素描2",
        "素描3",
        "素描4",
        "素描6",
        "素描76",
        "机构"
      ],
      levelList: [
        "一级",
        "二级",
        "三级",
        "四级",
        "五级",
        "六级",
        "七级",
        "八级",
        "九级",
        "十级"
      ],
      organizeChecked: "",
      levelChecked: "",
      subjectChecked: "",
      birthday: "2010-01-01",
      errorText: ""
    };
  }
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

  componentDidMount() {
    wx.request({
      url: "http://127.0.0.1:7001/app/organize/get_list", //仅为示例，并非真实的接口地址
      data: {},
      header: {
        "content-type": "application/json" // 默认值
      },
      success: res => {
        console.log(res.data.data);
        if (res.data.success) {
          console.log(this);
          this.setState({
            organizeList: res.data.data
          });
        }
      }
    });
  }
  onChange = e => {
    this.setState({
      selectorCheckedSex: this.state.selectorSex[e.detail.value]
    });
  };
  onChangeOrganize = e => {
    this.setState({
      organizeChecked: this.state.organizeList[e.detail.value]
    });
  };
  onChangeSubject = e => {
    this.setState({
      subjectChecked: this.state.subjectList[e.detail.value]
    });
  };
  onChangeLevel = e => {
    this.setState({
      levelChecked: this.state.levelList[e.detail.value]
    });
  };
  onDateChange = e => {
    this.setState({
      birthday: e.detail.value
    });
  };
  handleChangeName(value) {
    this.setState({
      name: value
    });
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value;
  }
  handleChangeNationality(value) {
    this.setState({
      nationality: value
    });
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value;
  }
  handleChangeIdNumber(value) {
    this.setState({
      id_number: value
    });
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value;
  }
  handleChangeContact(value) {
    this.setState({
      contact: value
    });
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value;
  }
  // 提交报名数据
  registerApplyData() {
    this.setState({
      ajaxLoading: true
    });
    wx.request({
      url: "http://127.0.0.1:7001/app/apply/register", //仅为示例，并非真实的接口地址
      method:'POST',
      data: {
        name: this.state.name,
        sex: this.state.selectorCheckedSex,
        nationality: this.state.nationality,
        birthday: this.state.birthday,
        id_number: this.state.id_number,
        contact: this.state.contact,
        organize_id: this.state.organizeChecked._id,
        organize_name: this.state.organizeChecked.name,
        exam_course: this.state.subjectChecked,
        exam_level: this.state.levelChecked
      },
      header: {
        "content-type": "application/json" // 默认值
      },
      success: res => {
        console.log(res.data.data);
        if (res.data.success) {
          this.setState({
            ajaxLoading: false,
            name:'',
            selectorCheckedSex:'',
            nationality:'',
            id_number:'',
            contact:'',
            birthday:'',
            organizeChecked:'',
            subjectChecked:'',
            levelChecked:'',
          });
          // 清空数据

          Taro.navigateTo({
            url: '/pages/ApplySuccess/index'
          })
        }
      }
    });
  }
  // 提交数据
  submitData = value => {
    console.log("姓名:", this.state.name);
    console.log("性别:", this.state.selectorCheckedSex);
    console.log("联系人:", this.state.contact);
    console.log("民族:", this.state.nationality);
    console.log("出生日期:", this.state.birthday);
    console.log("身份证号码:", this.state.id_number);
    console.log("组织机构:", this.state.organizeChecked);
    console.log("科目:", this.state.subjectChecked);
    console.log("级别:", this.state.levelChecked);
    if (!this.state.name.length) {
      console.log("请填写姓名");
      this.setState({
        errorText: "请填写姓名",
        isOpened: true
      });
      return;
    }
    if (!this.state.selectorCheckedSex) {
      console.log("请选择性别!");
      this.setState({
        errorText: "请选择性别",
        isOpened: true
      });
      return;
    }

    if (!this.state.nationality) {
      console.log("请填写民族!");
      this.setState({
        errorText: "请填写民族!",
        isOpened: true
      });
      return;
    }
    if (!this.state.birthday) {
      console.log("请填写出生日期!");
      this.setState({
        errorText: "请填写出生日期!",
        isOpened: true
      });
      return;
    }
    if (!this.validateIdNumber(this.state.id_number)) {
      console.log("请填写身份证号码!");
      this.setState({
        errorText: "请填写正确的身份证号码!",
        isOpened: true
      });
      return;
    }
    if (!this.state.contact) {
      console.log("请填写联系人!");
      this.setState({
        errorText: "请填写联系人!",
        isOpened: true
      });
      return;
    }
    if (!this.state.organizeChecked) {
      console.log("请选择所属学校/机构!");
      this.setState({
        errorText: "请选择所属学校/机构!",
        isOpened: true
      });
      return;
    }
    if (!this.state.subjectChecked) {
      console.log("请选择考试科目!");
      this.setState({
        errorText: "请选择考试科目!",
        isOpened: true
      });
      return;
    }
    if (!this.state.levelChecked) {
      console.log("请选择考试级别!");
      this.setState({
        errorText: "请选择考试级别!",
        isOpened: true
      });
      return;
    }
    // 数据验证成功
    this.registerApplyData();
  };
  render() {
    return (
      <View className="apply-wrap">
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

        <AtInput
          name="name"
          title="姓名"
          border={false}
          type="text"
          placeholder="请输入姓名"
          value={this.state.name}
          onChange={this.handleChangeName.bind(this)}
        />
        <View className="page-section">
          <View>
            <Picker
              mode="selector"
              range={this.state.selectorSex}
              onChange={this.onChange}
            >
              <AtList>
                <AtListItem
                  title="性别"
                  extraText={this.state.selectorCheckedSex}
                />
              </AtList>
            </Picker>
          </View>
        </View>
        <AtInput
          name="nationality"
          title="民族"
          border={false}
          type="text"
          placeholder="请输入民族"
          value={this.state.nationality}
          onChange={this.handleChangeNationality.bind(this)}
        />
        <View className="page-section">
          <View>
            <Picker mode="date" onChange={this.onDateChange}>
              <AtList>
                <AtListItem title="出生日期" extraText={this.state.birthday} />
              </AtList>
            </Picker>
          </View>
        </View>
        <AtInput
          name="id_number"
          title="身份证"
          type="idcard"
          placeholder="身份证号码"
          value={this.state.id_number}
          onChange={this.handleChangeIdNumber.bind(this)}
        />
        <AtInput
          name="contact"
          title="联系人"
          type="text"
          placeholder="请输入联系人"
          border={false}
          value={this.state.contact}
          onChange={this.handleChangeContact.bind(this)}
        />
        <View className="page-section">
          <View>
            <Picker
              mode="selector"
              range={this.state.organizeList}
              rangeKey="name"
              onChange={this.onChangeOrganize}
            >
              <AtList>
                <AtListItem
                  title="所属机构"
                  extraText={this.state.organizeChecked.name}
                />
              </AtList>
            </Picker>
          </View>
        </View>
        <View className="page-section">
          <View>
            <Picker
              mode="selector"
              range={this.state.subjectList}
              onChange={this.onChangeSubject}
            >
              <AtList>
                <AtListItem
                  title="报考科目"
                  extraText={this.state.subjectChecked}
                />
              </AtList>
            </Picker>
          </View>
        </View>
        <View className="page-section">
          <View>
            <Picker
              mode="selector"
              range={this.state.levelList}
              onChange={this.onChangeLevel}
            >
              <AtList>
                <AtListItem
                  title="报考级别"
                  extraText={this.state.levelChecked}
                />
              </AtList>
            </Picker>
          </View>
        </View>
        <View className="submit-button">
          <AtButton
            type="primary"
            onClick={this.submitData}
            loading={this.state.ajaxLoading}
          >
            提交报名资料
          </AtButton>
        </View>
      </View>
    );
  }
}
