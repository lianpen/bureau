
/**
 * 模态框
   lianpen
 */
(function defineModal() {
	
	var Modal = function(dom) {
		this.$dom = $(dom);
		this.state = {
			open: false
		};
		this.onCloseHandler = this.close.bind(this);
	}
	
	Modal.prototype.open = function() {
		var context = this;
		this.state.open = true;
		showDom.call(this);
		showMask.call(this);
		this.addEvents();
		function showDom() {
			this.$dom.show();
			this.$dom.addClass('zoom-enter zoom-enter-active');
			setTimeout(function() {
				context.$dom.removeClass('zoom-enter zoom-enter-active');
			}, 200);
		}
		function showMask() {
			if (!this.$mask) {
				this.$mask = this.getMask();
			}
			this.$mask.show();
			this.$mask.addClass('fade-enter fade-enter-active');
			setTimeout(function() {
				context.$mask.removeClass('fade-enter fade-enter-active');
			}, 200);
		}
	}
	
	Modal.prototype.close = function() {
		var context = this;
		this.state.open = false;
		hideDom.call(this);
		hideMask.call(this);
		this.removeEvents();
		function hideDom() {
			this.$dom.addClass('zoom-leave zoom-leave-active');
			setTimeout(function() {
				context.$dom.removeClass('zoom-leave zoom-leave-active');
				context.$dom.hide();
			}, 200);
		}
		function hideMask() {
			this.$mask.addClass('fade-leave fade-leave-active');
			setTimeout(function() {
				context.$mask.removeClass('fade-leave fade-leave-active');
				context.$mask.hide();
			}, 200);
		}
	}
	
	Modal.prototype.addEvents = function() {
		this.$mask.on('click', this.onCloseHandler);
		this.$dom.find('.modal-close').on('click', this.onCloseHandler);
	}
	
	Modal.prototype.removeEvents = function() {
		this.$mask.off('click', this.onCloseHandler);
		this.$dom.find('.modal-close').off('click', this.onCloseHandler);
	}
	
	Modal.prototype.toggle = function() {
		this.state.open = !this.state.open;
		this[this.state.open ? 'open' : 'close']();
	}
	
	Modal.prototype.getMask = function() {
		var $modalMask = $('.modalMask');
		if (!$modalMask.length) {
			$modalMask = $(document.createElement('div'));
			$modalMask.addClass('modalMask');
			$(document.body).append($modalMask);
		}
		return $modalMask;
	}
	
	$.fn.modal = function(action) {
		this.each(function() {
			var inst = this.modalInst;
			if (!inst) {
				inst = this.modalInst = new Modal(this);
			}
			if (!!action && inst[action]) {
				inst[action]();
			}
		});
	}
	
})();