
/**
 * 单选框
   lianpen
 */
(function defineRadio() {
	var RadioGroup = function(dom) {
		this.$dom = $(dom);
		var defaultValue = this.$dom.data('value');
		if (defaultValue !== undefined && defaultValue !== null) {
			this.setDefaultChecked(defaultValue);
		}
		this.$dom.on('click', this.onClick.bind(this));
	}
	
	RadioGroup.prototype.setDefaultChecked = function(value) {
		var $radio = this.$dom.find('.radio[data-value=' + value + ']');
		if ($radio.length) {
			$radio.find('input')[0].checked = true;
		}
	}
	
	RadioGroup.prototype.onClick = function(event) {
		var target = event.target;
		if (!$(target).is('input')) return;
		var $radioComp = $(target).parents('.radio');
		var value = $radioComp.data('value');
		this.$dom.data('value', value);
		this.$dom.find('input').each(function() {
			if (this !== target) this.checked = false;
		});
		target.checked = true;
	}
	
	$.fn.radioGroup = function() {
		this.each(function() {
			var inst = this.radioInst;
			if (!inst) {
				this.radioInst = new RadioGroup(this);
			}
		});
	}
	
	$(function() {
		$('.radio-group').radioGroup();
	});
	
}());