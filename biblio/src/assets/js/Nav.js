/* Nav.js */
export default {
  name: "Nav",
  data() {
    return {
      messageData:[{
        title:'hi!'
      }],
      drawer: false,
      formsee: false,
      form: {
        name: 'nihao',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth:'100px',
      labelPosition:'right'
    };
  },
  methods: {
    route2Home() {
      this.$router.push({ path: "/" });
    },
    route2Gate() {
      this.$router.push({ path: "/gate" });
    },
    setdrawer(){
      this.drawer = true;
      console.log(this.drawer);
    },
    showForm(){
      this.formsee=true;
    }
  },
};
