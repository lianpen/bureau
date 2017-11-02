
/**
 * 下拉框
   lianpen
 */
(function defineDropdown() {
	
	var Dropdown = function(dom, uuid) {
		this.param = {};
		this.uuid = uuid;
		this.$dom = $(dom);
		this.$button = this.$dom.find('button');
		this.$ul = this.$dom.find('ul');
		this.$necromancy = this.createNecromancy();
		var $firstLi = this.$ul.children().eq(0);
		if ($firstLi.length) {
			this.$dom.data('value', $firstLi.data('value'));
		}
		this.state = {
			open: false
		}
		this.addEvents();
	}
	
	Dropdown.uuid = 0;
	
	/**
	 *  通灵
	 */
	Dropdown.prototype.createNecromancy = function() {
		var $necromancy = $(document.createElement('div'));
		$necromancy.addClass('dropdown-necromancy dropdown-necromancy-' + this.uuid);
		var $cloneUl = this.$ul.clone();
		$necromancy.append($cloneUl);
		$(document.body).append($necromancy);
		return $necromancy;
	}
	
	Dropdown.prototype.open = function() {
		var context = this;
		setTimeout(function() {
			$(document).one('click', function() {
				context.close.call(context);
			});
		}, 100);
		this.state.open = true;
		this.$dom.addClass('open');
		this.$necromancy.css({
			width: this.$dom.width(),
			left: this.$dom.offset().left,
			top: this.$dom.offset().top + 32
		});
		this.$necromancy.show();
		this.$necromancy.addClass('slide-up-enter slide-up-enter-active');
		setTimeout(function() {
			context.$necromancy.removeClass('slide-up-enter slide-up-enter-active');
		}, 200);
	}
	
	Dropdown.prototype.close = function() {
		var context = this;
		this.state.open = false;
		this.$dom.removeClass('open');
		this.$necromancy.addClass('slide-up-leave slide-up-leave-active');
		setTimeout(function() {
			context.$necromancy.removeClass('slide-up-leave slide-up-enter-leave');
			context.$necromancy.hide.call(context);
		}, 200);
	}
	
	Dropdown.prototype.addEvents = function() {
		var context = this;
		this.$button.on('click', function() {
			context[context.state.open ? 'close' : 'open'].call(context);
		});
		this.$necromancy.on('click', 'li', function() {
			var value = $(this).attr('data-value');
			context.setValue.call(context, value);
			context.close.call(context);
			var onChange = context.param.onChange; //触发钩子
			if (onChange && _.isFunction(onChange)) {
				onChange(value);
			}
		});
	}
	
	Dropdown.prototype.setParam = function(param) {
		this.param = param;
		if (param.defaultValue) {
			this.setValue(param.defaultValue);
		}
	}
	
	Dropdown.prototype.setValue = function(value) {
		this.$dom.attr('data-value', value);
		var $li = this.$dom.find('li[data-value=' + value + ']');
		this.$button.find('label').html($li.html());
	}
	
	$.fn.dropdown = function(param) {
		this.each(function() {
			var inst = this.dropdownInst;
			if (!inst) {
				Dropdown.uuid += 1;
				inst = this.dropdownInst = new Dropdown(this, Dropdown.uuid);
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