/* Nav.js */
export default {
  name: "Nav",
  props: {
    pageState: Number,
  },
  data() {
    return {
      infoform: {
        username:'',
        password:'',
        email: '',
        nickname: '',
        avator: '',
        auth: '',
        admin: false,
        token:'',
        id:'',
        verification_code:''
      },
      searchOptions: [
        {
          option: "1",
          label: "全站",
        },
        {
          option: "2",
          label: "论文",
        },
        {
          option: "3",
          label: "专利",
        },
        {
          option: "4",
          label: "学者",
        },
      ],
      option: "1",
      searchInput: "",
      existName:false,
      textarea2:"",
      // messageData: [
      //   {
      //     from: "user10086",
      //     time: "2020.12.19 16:05",
      //     content: "hi!",
      //   },
      //   {
      //     from: "user10087",
      //     time: "2020.12.19 16:07",
      //     content:
      //       "hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!",
      //   },
      //   {
      //     from: "user10086",
      //     time: "2020.12.19 16:05",
      //     content: "hi!",
      //   },
      //   {
      //     from: "user10086",
      //     time: "2020.12.19 16:05",
      //     content: "hi!",
      //   },
      //   {
      //     from: "user10086",
      //     time: "2020.12.19 16:05",
      //     content: "hi!",
      //   },
      //   {
      //     from: "user10086",
      //     time: "2020.12.19 16:05",
      //     content: "hi!",
      //   },
      //   {
      //     from: "user10086",
      //     time: "2020.12.19 16:05",
      //     content: "hi!",
      //   },
      //   {
      //     from: "user10086",
      //     time: "2020.12.19 16:05",
      //     content: "hi!",
      //   },
      // ],
      messageData:[],
      lg: 1,
      drawer: false,
      formsee: false,
      form:[{
        name:'',
        avatar:'',
        id:''
      }],
      formLabelWidth: "100px",
      labelPosition: "right",
    };
  },
  mounted: function () {
    this.$axios({
      method:'get',
      url:'/user',
      params:{
        
      },
      headers: {
        token: window.localStorage.getItem("token"),
      },
    }).then(response => {
      console.log(response);
      this.infoform = response.data.information;
    }).catch(error => {
      console.log(error);
    })

    this.$axios({
      method:'get',
      url:'/user/message',
      params:{
        
      },
      headers: {
        token: window.localStorage.getItem("token"),
      },
    }).then(response => {
      console.log(response);
      // this.infoform = response.data.information;
    }).catch(error => {
      console.log(error);
    })
  },
  methods: {
    handleCommand(command) {
      if (command == "info") this.$router.push({ path: "/info" });
      else if (command == "gate") this.$router.push({ path: "/gate" });
      else if (command == "lgout") {
          window.localStorage.clear();
          this.$router.push({ path: "/login" });
      }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    deleteAll() {
      this.messageData.splice();
    },
    route2Home() {
      this.$router.push({ path: "/" });
    },
    route2Login() {
      this.$router.push({ path: "/login" });
    },
    route2Register() {
      this.$router.push({ path: "/register" });
    },
    route2Gate() {
      this.$router.push({ path: "/gate" });
    },
    setdrawer() {
      this.drawer = true;
      console.log(this.drawer);
    },
    showForm() {
      this.formsee = true;
    },
    findUser(){
      this.$axios({
        method:'get',
        url:'/user/search',
        params:{
          username:this.form.name
        },
        headers: {
          token: window.localStorage.getItem("token")
        },
      }).then(response => {
        console.log(response);
        if(response.data.msg == "Search successfully"){
          this.form[0].name = response.data.user.username;
          this.form[0].avatar = response.data.user.avatar;
          this.form[0].id = response.data.user.id;
          console.log(this.form);
          this.existName = true;
        }
        
      }).catch(error => {
        console.log(error);
      })
    },
    send_msg(){
      this.$axios({
        method:'post',
        url:'/user/message',
        params:{
          
        },
        headers: {
          token: window.localStorage.getItem("token")
        },
        data:{
          receiveID:this.form[0].id,
          content:this.textarea2
        }
      }).then(response => {
        console.log(response);
        if(response.data.msg == "Send successfully"){
          this.$message.success("发送成功！");
          this.formsee = false;
        }
        else{
          this.$message.error("发送失败");
          this.formsee = false;
        }
      }).catch(error => {
        console.log(error);
      })
    },
    change(e){
      this.$forceUpdate(e);
    }
  },
};
