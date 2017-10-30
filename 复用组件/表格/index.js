
/**
 * 表格
 * lianpen
 */
(function defineTable() {
	var Table = function(dom, param) {
		this.$dom = $(dom);
		this.param = Object.assign({}, Table.defaultOption, param);
		this.init();
	}
	
	Table.defaultOption = {
		data: [],
		checkable: true
	}
	
	Table.template = {
		head: '<thead><tr>{{checkbox}}{{list}}</tr></thead>',
		tr: '<tr>{{checkbox}}{{list}}</tr>',
		checkbox: '<div class="checkbox"><label><input type="checkbox"><i></i></label></div>'
	}
	
	Table.cmpiled = {
		head: _.template(Table.template.head),
		tr: _.template(Table.template.tr)
	}
	
	Table.prototype.init = function() {
		this.state = {
			checkedList: []
		};
		this.addEvents();
		this.render();
	}
	
	Table.prototype.render = function() {
		var context = this;
		var html = renderHead() + renderBody();
		this.$dom.html(html);
		function renderHead() {
			var checkbox = '';
			if (context.param.checkable) {
				checkbox = '<th>' + Table.template.checkbox + '</th>';
			}
			var list = context.param.columns.map(function(column) {
				return '<th>' + column.title + '</th>';
			});
			return Table.cmpiled.head({
				checkbox: checkbox,
				list: list
			});
		}
		function renderBody() {
			return '<tbody>' + context.param.data.map(function(el, index) {
				return renderLine(el, index);
			}) + '</tbody>';
		}
		function renderLine(data, index) {
			var checkbox = '';
			if (context.param.checkable) {
				checkbox = '<td>' + Table.template.checkbox + '</td>';
			}
			return '<tr data-index="' + index + '">' + checkbox + context.param.columns.map(function(column) {
				var content = column.content;
				var dummy = _.isFunction(content) ? content(data) : data[content];
				return '<td>' + dummy + '</td>';
			}) + '</tr>';
			
		}
	}
	
	Table.prototype.updateData = function(data) {
		this.param.data = data || [];
		this.render();
	}
	
	Table.prototype.addEvents = function() {
		var context = this;
		this.$dom.on('click', function(event) {
			var $target = $(event.target);
			var isCheckbox = !!$target.parents('.checkbox').length;
			var $tr = $target.parents('tr');
			if (!$tr.length) return;
			var index = parseInt($tr.data('index'));
			if (isCheckbox) {
				var isCheckAll = !!$target.parents('thead').length;
				event.preventDefault();
				context.onCheck.call(context, index, isCheckAll);
			} else {
				context.onRowClick.call(context, index);
			}
		});
	}
	
	Table.prototype.onCheck = function(index, isCheckAll) {
		var context = this;
		var $checkboxes = context.$dom.find('tbody input[type=checkbox]');
		var $checkboxBoss = context.$dom.find('thead input[type=checkbox]');
		if (isCheckAll) {
			var allChecked = isAllChecked();
			checkAll(!allChecked);
		} else {
			var checked = isChecked(index);
			check(index, !checked);
			$checkboxBoss[0].checked = isAllChecked();
		}
		if (_.isFunction(this.param.onCheck)) {
			var data = Array.prototype.map.call($checkboxes, function(checkbox, index) {
				return !!checkbox.checked ? index : 0;
			}).filter(function(el) {
				return !!el;
			}).map(function(index) {
				return context.param.data[index];
			});			
			this.param.onCheck(data);
		}
		function check(index, value) {
			if (value === undefined) value = true;
			var $checkbox = context.$dom.find('tbody input[type=checkbox]').eq(index);
			if (!$checkbox.length) return false;
			$checkbox[0].checked = value;
		}
		function checkAll(value) {
			if (value === undefined) value = true;
			Array.prototype.forEach.call($checkboxes, function(checkbox) {
				checkbox.checked = value;
			});
			$checkboxBoss[0].checked = value;
		}
		function isChecked(index) {
			var $checkbox = context.$dom.find('tbody input[type=checkbox]').eq(index);
			if (!$checkbox.length) return false;
			return $checkbox[0].checked;
		}
		function isAllChecked() {
			return Array.prototype.every.call($checkboxes, function(checkbox) {
				return !!checkbox.checked;
			});
		}
	}
	
	Table.prototype.onRowClick = function(index) {
		if (index >= this.param.data.length) return;
		var data = this.param.data[index];
		if (_.isFunction(this.param.onRowClick)) {
			this.param.onRowClick(this.param.data[index]);
		}
	}
	
	$.fn.table = function(param) {
		this.each(function() {
			if (param.action == 'updateData') {
				if (!this.tableInst) {
					console.error('表格尚未初始化，请先配置表规则');
				} else {
					this.tableInst.updateData(param.data);
				}
				return;
			}
			if (!this.tableInst) {
				this.tableInst = new Table(this, param);
			}
		});
	}
	
})();