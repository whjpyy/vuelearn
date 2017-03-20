var app = new Vue({
	el: '#app',
	data: {
		'message': 'Hello Vue！'
	}
})

var app2 = new Vue({
	el: '#app-2',
	data:{
		message: 'You loaded this page on ' + new Date()
	}
})

var app3 = new Vue({
	el: '#app-3',
	data:{
		seen: true
	}
})

var app4 = new Vue({
	el: '#app-4',
	data: {
		todos: [
			{text: 'Learn Javascript'},
			{text: 'Learn Vue'},
			{text: 'Build something awesome'}
		]
	}
})

var app5 = new Vue({
	el: '#app-5',
	data: {
		message: 'Hello Vue.js'
	},
	methods: {
		reverseMessage: function(){
			this.message = this.message.split('').reverse().join('')
		}
	}
})

var app6 = new Vue({
	el: '#app-6',
	data: {
		message: 'Hello Vue!'
	}
})

Vue.component('todo-item', {
	props: ['todo'],
	template: '<li>{{todo.text}}</li>'
})
var app7 = new Vue({
	el: '#app-7',
	data: {
		groceryList: [
			{text: 'Vegetables'},
			{text: 'Cheese'},
			{text: 'Whatever else hunmans are supposed to eat'}
		]
	}
})

var vm = new Vue({
	data: {
		a: 1
	},
	beforeCreate: function(){
		console.log('beforeCreate');
	},
	created: function(){
		console.log('created');
	},
	beforeMount: function(){
		console.log('beforeMount');
	},
	mounted: function(){
		console.log('mounted');
	}
})

/* 3 - 模板语法 */
var app8 = new Vue({
	el: '#app-8',
	data: {
		message: '<b>Hello World</b>',
		msg: 'chen',
		dynamicId: 18,
		someDynamicCondition: true,
		firstName: 'Foo',
		lastName: 'Bar',
		fullName: 'Foo Bar',
		isActive: true, hasError: false,
		url: 'www.baidu.com'
	},
	// 过滤器
	filters: {
		capitalize: function(value, a , b){
			//console.log(a)
			//console.log(b)
			if(!value) return ''
			value = value.toString()
			var result = value.charAt(0).toUpperCase() + value.slice(1);
			result = 'b'
			console.log(result);
			return result;
		}
	},
	// 计算属性
	computed: {
		// a computed getter
		reversedMessage: function(){
			return this.message.split('').reverse().join('')
		},
		now: function(){
			return Date.now()
		}, 
		fullName2: {
			get: function(){
				return this.firstName + ' ' + this.lastName
			},
			set: function(newValue){
				var names = newValue.split(' ');
				this.firstName = names[0]
				this.lastName = names[names.length - 1]
			}
		}
	},
	// 监听属性
	watch: {
		firstName: function(val){
			this.fullName = val + ' ' + this.lastName
		},
		lastName: function(val){
			this.fullName = this.firstName + ' ' + val
		}
	}
})

/*  观察Watchers */
var watchExampleVM = new Vue({
	el: '#watch-example',
	data: {
		question: '',
		answer: 'I cannot give you an answer until you ask a question'
	}
	,
	watch: {
		// 如果question发生改变，这个函数就会运行
		question: function(newQuestion){
			this.answer = 'Waiting for you to stop typing...'
			this.getAnswer()
		}
	},
	methods: {
		// _.debounce 是一个通过lodash现在操作频率的函数。
		// 在这个例子中，我们希望限制访问yesno.wtf/api的频率
		// ajax请求直到用户输入完毕才会发出
		getAnswer: _.debounce(function(){
			var vm = this
			if(this.question.indexOf('?') === -1){
				vm.answer = 'Qestion unually contain a question mark.:-)'
				return
			}
			vm.answer = 'Thinking...'
			axios.get('https://yesno.wtf/api').then(function(response){
				vm.answer = _.capitalize(response.data.answer)
			}).catch(function(error){
				vm.answer = 'Error! Could not reach the API.' + error
			})
		}, 500)
	}
})