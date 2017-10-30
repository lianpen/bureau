(function definePagination() {
	var Pagination = function(dom, param) {
		this.$dom = $(dom);
		this.param = Object.assign({}, Pagination.defaultOption, param);
		this.init();
	}
	
	Pagination.defaultOption = {
		pageSize: 15,
		current: 1,
		jumpNumber: 5
	}
	
	Pagination.template = {
		prev: '<li class="previous {{disabled}}"><a><i class="icon icon-left"></i></a></li>',
		next: '<li class="next {{disabled}}"><a><i class="icon icon-right"></i></a></li>',
		pager: '<li class="item {{on}}" data-value={{value}}><a>{{value}}</a></li>',
		jumpPrev: '<li class="jump jump-prev"></li>',
		jumpNext: '<li class="jump jump-next"></li>'
	}
	
	Pagination.cmpiled = {
		prev: _.template(Pagination.template.prev),
		next: _.template(Pagination.template.next),
		pager: _.template(Pagination.template.pager)
	}
	
	Pagination.prototype.init = function(param) {
		this.state = {
			total: parseInt((this.param.total - 1) / this.param.pageSize) + 1,
			current: this.param.current
		};
		this.addEvents();
		this.render();
		
	}
	Pagination.prototype.render = function() {
		/*
		  <ul class="pagination">
		    <li class="previous">
		      <a>
		        <i class="icon icon-left"></i>
		      </a>
		    </li>
		    <li class='item'><a>1</a></li>
		    <li class="jump jump-prev"></li>
		    <li class='item'><a>3</a></li>
		    <li class='item'><a>4</a></li>
		    <li class='item on'><a>5</a></li>
		    <li class='item'><a>6</a></li>
		    <li class='item'><a>7</a></li>
		    <li class="jump jump-next"></li>
		    <li class='item'><a>11</a></li>
		    <li class="next">
		      <a>
		        <i class="icon icon-right"></i>
		      </a>
		    </li>
		  </ul>	
		*/
		var context = this;
		this.renderedPages = [];
		var html = renderPrev() + renderPages() + renderNext();
		this.$dom.html(html);
		function renderPrev() {
			return Pagination.cmpiled.prev({disabled: context.state.current == 1 ? 'disabled' : ''}); 
		}
		function renderNext() {
			return Pagination.cmpiled.next({disabled: context.state.current == context.state.total ? 'disabled' : ''}); 
		}
		function renderPages() {
			var result = '';
			if (context.state.total <= 9) {
				for (var i = 1; i <= context.state.total; i += 1) {
					result += getPage(i);
				}
			} else if (context.state.current <= 4) {
				for (i = 1; i <= Math.max(5, context.state.current + 2); i += 1) {
					result += getPage(i);
				}
				result += Pagination.template.jumpNext;
				result += getPage(context.state.total);
			} else if (context.state.current >= context.state.total - 3) {
				result += getPage(1);
				result += Pagination.template.jumpPrev;
				for (i = Math.min(context.state.current - 2, context.state.total - 4); i <= context.state.total; i += 1) {
					result += getPage(i);
				}
			} else {
				result += getPage(1);
				result += Pagination.template.jumpPrev;
				for (i = context.state.current - 2; i <= context.state.current + 2; i += 1) {
					result += getPage(i);
				}
				result += Pagination.template.jumpNext;
				result += getPage(context.state.total);
			}
			return result;
		}
		function getPage(value) {
			if (value <= 0) return;
			if (value > context.state.total) return;
			if (context.renderedPages.indexOf(value) > -1) return;
			context.renderedPages.push(value);
			return Pagination.cmpiled.pager({
				value: value,
				on: context.state.current == value ? 'on' : ''
			}); 
		}
	}
	
	Pagination.prototype.addEvents = function() {
		var context = this;
		this.$dom.on('click', function(event) {
			var target = event.target;
			if (target.tagName != "LI") {
				target = target.parentNode;
			}
			var $target = $(target);
			if ($target.hasClass('item')) {
				context.onItemClick.call(context, $target.data('value'));
			} else if ($target.hasClass('previous')) {
				context.onPrevClick.call(context);
			} else if ($target.hasClass('next')) {
				context.onNextClick.call(context);
			} else if ($target.hasClass('jump-prev')) {
				context.onJumpPrevClick.call(context);
			} if ($target.hasClass('jump-next')) {
				context.onJumpNextClick.call(context);
			}
		});
	}
	
	Pagination.prototype.onItemClick = function(value) {
		this.state.current = value;
		this.triggerHook();
		this.render();
	}
	
	Pagination.prototype.onPrevClick = function() {
		var value = this.state.current - 1;
		value = Math.max(1, value);
		if (value != this.state.current) {
			this.state.current = value;
			this.triggerHook();
			this.render();
		}
	}
	
	Pagination.prototype.onNextClick = function() {
		var value = this.state.current + 1;
		value = Math.min(this.state.total, value);
		if (value != this.state.current) {
			this.state.current = value;
			this.triggerHook();
			this.render();
		}
	}
	
	Pagination.prototype.onJumpPrevClick = function() {
		var value = this.state.current - this.param.jumpNumber;
		value = Math.max(1, value);
		if (value != this.state.current) {
			this.state.current = value;
			this.triggerHook();
			this.render();
		}
	}
	
	Pagination.prototype.onJumpNextClick = function() {
		var value = this.state.current + this.param.jumpNumber;
		value = Math.min(this.state.total, value);
		if (value != this.state.current) {
			this.state.current = value;
			this.triggerHook();
			this.render();
		}
	}
	
	Pagination.prototype.triggerHook = function() {
		if (this.param.onChange && _.isFunction(this.param.onChange)) {
			this.param.onChange(this.state.current);
		}
	}
	
	$.fn.pagination = function(param) {
		this.each(function() {
			if (!this.paginationInst) {
				this.paginationInst = new Pagination(this, param);
			}
		});
	}
	
})();