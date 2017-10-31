
/**
 * 下拉框
 */
(function defineDropdown() {
	var dropdown = function(dom) {
		this.param = {};
		this.$dom = $(dom);
		this.$button = this.$dom.find('button');
		this.$ul = this.$dom.find('ul');
		var $firstLi = this.$ul.children().eq(0);
		if ($firstLi.length) {
			this.$dom.data('value', $firstLi.data('value'));
		}
		this.addEvents();
	}
	
	dropdown.prototype.addEvents = function() {
		var context = this;
		this.$button.on('click', function() {
			if (!context.$dom.hasClass('open')) {
				setTimeout(function() {
					$(document).one('click', function() {
						context.$dom.removeClass('open');
					});
				}, 100);
			}
			context.$dom.toggleClass('open');
		});
		this.$ul.on('click', 'li', function() {
			var value = $(this).attr('data-value');
			context.setValue.call(context, value);
			context.$dom.removeClass('open');
			var onChange = context.param.onChange; //触发钩子
			if (onChange && _.isFunction(onChange)) {
				onChange(value);
			}
		});
	}
	
	dropdown.prototype.setParam = function(param) {
		this.param = param;
		if (param.defaultValue) {
			this.setValue(param.defaultValue);
		}
	}
	
	dropdown.prototype.setValue = function(value) {
		this.$dom.data('value', value);
		var $li = this.$dom.find('li[data-value=' + value + ']');
		this.$button.find('label').html($li.html());
	}
	
	$.fn.dropdown = function(param) {
		this.each(function() {
			var inst = this.dropdownInst;
			if (!inst) {
				inst = this.dropdownInst = new dropdown(this);
			}
			if (param) {
				inst.setParam(param);
			}
		});
	}
	
	$(function() {
		$('.dropdown').dropdown();	
	});
})();