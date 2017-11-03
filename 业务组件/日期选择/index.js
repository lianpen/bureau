
/**
 * 日期选择
   lianpen
 */
(function defineDatePicker() {
	var DatePicker = function(dom, param) {
		this.$dom = $(dom);
		this.param = param;
		if (this.param.range !== 'month' && this.param.range !== 'year') {
			console.error('时间选择组件必须传range参数，值是month和year中的一个。');
			return;
		}
		this.state = {
			month: 0
		};
		this.parseValue();
		this.$picker = this.createPicker();
		this.renderHeader();
		this.renderTable();
		this.renderInput();
		this.addEvents();
	}
	
	/**
	 * uuid
	 */
	DatePicker.uuid = 0;
	
	/**
	 * 常量
	 */
	DatePicker.constant = {};
	DatePicker.constant.monthText = ['一月', '二月', '三月', '四月', '五月', '六月',
	                                 '七月', '八月', '九月', '十月', '十一月', '十二月'];
	DatePicker.constant.dayNumber = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	/**
	 * 模板
	 */
	DatePicker.template = {};
	DatePicker.template.container = 
		'<div class="calendar-picker">' +
			'<div class="calendar-panel">' +
				'<div class="calendar-input-wrap">' +
					'<div class="calendar-date-input-wrap">' +
						'<input class="calendar-input" placeholder="请选择日期" readonly="readonly">' +
					'</div>' +
				'</div>' +
				'<div class="calendar-date-panel">' +
					'<div class="calendar-body">' +
						'<table class="calendar-table" cellspacing="0">' +
							'<tbody>' +
							'</tbody>' +
						'</table>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	DatePicker.template.header = 
		'<div class="calendar-header">' +
			'<a class="calendar-prev-month-btn"></a>' +
			'<span class="calendar-my-select">' +
			'	<a class="calendar-month-select">一月</a>' +
			'</span>' +
		'	<a class="calendar-next-month-btn"></a>' +
		'</div>';
	DatePicker.template.td = '<td class="calendar-cell {{selected}}"><div class="calendar-date">{{value}}</div></td>';
	DatePicker.cmpiled = {};
	DatePicker.cmpiled.td = _.template(DatePicker.template.td);
	
	/**
	 * 解析参数
	 * 如果范围是月，传一个数字即可。如果范围是年，要传月和日。
	 */
	DatePicker.prototype.parseValue = function() {
		var value = this.param.value;
		var range = this.param.range;
		if (value === undefined) {
			this.value = {
				month: undefined,
				day: undefined
			}
		} else if (range === 'year') {
			var ary = value.split(',');
			if (ary.length == 2) {
				this.value = {
					month: parseInt(ary[0]),
					day: parseInt(ary[1])
				}
			} else {
				this.value = {
					month: undefined,
					day: undefined
				}
			}
		} else if (range === 'month') {
			this.value = {
				day: parseInt(value)
			}
		}
		this.state.month = this.value.month || 0;
	}
	
	/**
	 *  创建选框dom
	 */
	DatePicker.prototype.createPicker = function() {
		var $picker = $(document.createElement('div'));
		$picker.addClass('calendar-picker-container calendar-picker-container-' + this.param.uuid);
		$picker.css({
			left: this.$dom.offset().left,
			top: this.$dom.offset().top
		});
		$picker.html(DatePicker.template.container);
		if (this.param.range === 'year') {
			$picker.find('.calendar-date-panel').prepend(DatePicker.template.header);
		}
		$(document.body).append($picker);
		return $picker;
	}
	
	/**
	 * 添加事件
	 */
	DatePicker.prototype.addEvents = function() {
		var context = this;
		this.$dom.on('click', this.open.bind(this));
		this.$picker.on('click', this.onPickerClick.bind(this));
	}
	
	/**
	 * 弹框点击全部委托在这个事件上
	 */
	DatePicker.prototype.onPickerClick = function(event) {
		event.stopPropagation();
		var $target = $(event.target);
		if ($target.hasClass('calendar-prev-month-btn')) {
			this.onPrevMonth.call(this);
		} else if ($target.hasClass('calendar-next-month-btn')) {
			this.onNextMonth.call(this);
		} else if ($target.hasClass('calendar-date')) {
			this.$picker.find('td').removeClass('calendar-selected-day');
			$target.parent().addClass('calendar-selected-day');
			var value = parseInt($target.html()) - 1;
			this.onValueClick.call(this, value);
		}
	}
	
	/**
	 * 日期点击事件
	 */
	DatePicker.prototype.onValueClick = function(value) {
		this.value.day = value;
		this.value.month = this.state.month;
		this.renderInput();
		var exportValue = '';
		if (this.param.range === 'year') {
			exportValue = this.value.month + ',' + this.value.day;
		} else if (this.param.range === 'month') {
			exportValue = this.value.day;
		}
		this.$dom.data('value', exportValue);
		if (this.param.onChange && _.isFunction(this.param.onChange)) {
			this.param.onChange(exportValue);
		}
		this.close();
	}
	
	
	/**
	 * 上一月事件
	 */
	DatePicker.prototype.onPrevMonth = function() {
		this.state.month -= 1;
		if (this.state.month <= -1) this.state.month = 11;
		this.renderHeader();
		this.renderTable();
	}
	
	/**
	 * 下一月事件
	 */
	DatePicker.prototype.onNextMonth = function() {
		this.state.month += 1;
		if (this.state.month >= 12) this.state.month = 0;
		this.renderHeader();
		this.renderTable();
	}
	
	/**
	 * 打开事件
	 */
	DatePicker.prototype.open = function(event) {
		event.stopPropagation();
		this.$picker.css({
			left: this.$dom.offset().left,
			top: this.$dom.offset().top
		});
		this.$picker.show();
		this.$picker.addClass('slide-up-enter slide-up-enter-active');
		var context = this;
		setTimeout(function() {
			context.$picker.removeClass('slide-up-enter slide-up-enter-active');
		}, 200);
		$(document).one('click', this.close.bind(this));
	}
	
	/**
	 * 关闭事件
	 */
	DatePicker.prototype.close = function(event) {
		this.$picker.addClass('slide-up-leave slide-up-leave-active');
		var context = this;
		setTimeout(function() {
			context.$picker.removeClass('slide-up-leave slide-up-leave-active');
			context.$picker.hide();
		}, 200);
	}
	
	/**
	 * 渲染表格
	 */
	DatePicker.prototype.renderTable = function() {
		var html = '';
		var dayNumber = this.getDayNumber();
		var weekNumber = Math.ceil((dayNumber - 1) / 7);
		var context = this;
		for (var week = 0; week < weekNumber; week += 1) {
			var days = [];
			for (var day = week * 7; day < Math.min((week + 1) * 7, dayNumber); day += 1) {
				days.push(day);
			}
			var daysHtml = days.map(function(day) {
				return DatePicker.cmpiled.td({
					value: day + 1,
					selected: (isSelected.call(context, day) ? 'calendar-selected-day' : '')
				})
			});
			var weekHtml = '<tr>' + daysHtml + '</tr>';
			html += weekHtml;
		}
		this.$picker.find('tbody').html(html);
		/**
		 * td是否选中
		 * 如果范围是年首先要判断月份是否一致
		 * 然后判断日期
		 */
		function isSelected(day) {
			if (this.param.range === 'year') {
				if ((this.value.month === undefined) || this.state.month !== this.value.month) {
					return false;
				}
			} 
			return (this.value.day !== undefined) && this.value.day === day;
		}
	}
	
	/**
	 * 渲染输入框
	 */
	DatePicker.prototype.renderInput = function() {
		var exportText = '';
		if (this.value.day !== undefined) {
			if (this.param.range === 'year') {
				exportText = '每年' + (this.value.month + 1) + '月' + (this.value.day + 1) + '日';
			} else if (this.param.range === 'month') {
				exportText = '每月' + (this.value.day + 1) + '日';
			}
		}
		this.$dom.find('.calendar-picker-input').val(exportText);
		this.$picker.find('.calendar-input').val(exportText);
	}
	
	/**
	 * 渲染选月栏
	 */
	DatePicker.prototype.renderHeader = function() {
		if (this.param.range !== 'year') return;
		var month = this.state.month;
		$(".calendar-month-select").html(DatePicker.constant.monthText[month]);
	}
	
	/**
	 * 获取表格渲染几天
	 */
	DatePicker.prototype.getDayNumber = function() {
		if (this.param.range === 'month') return 31;
		var month = this.state.month;
		return DatePicker.constant.dayNumber[month];
	}
	
	$.fn.datePicker = function(param) {
		param = param || {};
		this.each(function() {
			var inst = this.datePickerInst;
			if (!inst) {
				DatePicker.uuid += 1;
				param.uuid = DatePicker.uuid;
				inst = this.datePickerInst = new DatePicker(this, param);
			}
		});
	}
})();