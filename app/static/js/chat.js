const axi = axios.create();

Vue.component('mess', {
    delimiters: ['${', '}'],
    props: {
        message: {
            type: String,
            default: '',
            required: true
        },
        answer: {
            type: Boolean,
            required: true
        },
    },
    template: '#mess',

});


var chat = new Vue({
    delimiters: ['${', '}'],
    el: '#chat',
    data:{
        messArray: [],
        nextTodoId: 0,
        mess: '',
    },
    methods:{
        send: function(){
            this.mess=this.$refs.message.value;
            this.$refs.message.value='';
            this.$refs.message.focus();

            if (!this.mess){
                return
            }
            message = this.mess;
            this.mess ='';
            this.messArray.push({
                id: chat.nextTodoId++,
                message: message,
                answer: true,
            });

            axi.post('/api',{
                massage: message
            })
            .then(function (response) {
                console.log(response);
                chat.messArray.push({
                    id: chat.nextTodoId++,
                    message: response.data,
                    answer: false,
                })
            })
            .catch(function (error) {
                console.log(error);
            });

        },
    },
    created(){
        this.messArray.push({
            id: this.nextTodoId++,
            message: 'Привет, о чем ты хотел бы узнать?',
            answer: false,
        })
    },
    updated(){
        var container = this.$el.querySelector(".dialog");
        container.scrollTop = container.scrollHeight;
    }
});