/**
 * The About view
 */
define(
		[ 'utilities', 'text!../../../../templates/desktop/todos.html',
				'text!../../../../templates/desktop/todo-table-item.html',
				'text!../../../../templates/desktop/todo-edit-modal.html' ],
		function(utilities, TodosTemplate, TodoTableItemTemplate,
				TodoEditModalTemplate) {

			var ModalEditView = Backbone.View.extend({
				tagName : "div",
				events : {
					"click button[id='saveChanges']" : "saveChanges",
				},
				initialize : function(options) {
					this.todoView = options.todoView;
				},
				render : function() {
					utilities.applyTemplate($(this.el), TodoEditModalTemplate,
							{
								model : this.model
							});
					return this;
				},
				saveChanges : function() {
					this.model
							.on('change', this.todoView.render, this.todoView);
					this.model.save({
						description : $("#newDescription").val()
					});
					$("#editModal").modal('hide');
				}
			});

			var TodoView = Backbone.View
					.extend({
						tagName : "div",
						events : {
							"click a[name='delete']" : "deleteTodo",
							"click a[name='edit']" : "editTodo",
							"click input[name='completed']" : "completedTodo",
						},
						initialize : function(options) {
							this.todosView = options.todosView;
						},
						render : function() {
							utilities.applyTemplate($(this.el),
									TodoTableItemTemplate, {
										model : this.model
									});
							$(this.$el).find("[name='completed']").prop(
									'checked', this.model.attributes.completed);
							return this;
						},
						deleteTodo : function() {
							this.model.destroy();
							this.todosView.render();
						},
						editTodo : function() {
							var outter = this;
							var view = new ModalEditView({
								model : this.model,
								todoView : outter
							});
							$("#editModalContentArea").empty();
							$("#editModalContentArea").append(view.render().el);
							$("#editModal").modal();
							$("#editModal").modal('show');
						},
						completedTodo : function() {
							var checked = $(this.$el)
									.find("[name='completed']").get(0).checked;
							this.model.save({
								completed : checked
							});
						}

					});

			var TodosView = Backbone.View.extend({
				events : {
					"click button[id='create-button']" : "createTodo",
					'keypress #description' : 'searchKeywords',
			    },
			    searchKeywords: function(e){
			      if ( e.which === 13 ) { 
			        var keywords = $(e.target).val();

			        if(keywords === '') return;

			        this.createTodo();
			      }
			    },
				render : function() {
					utilities.applyTemplate($(this.el), TodosTemplate, {
						model : this.model
					});
					this.$("#todo-table > tbody").empty();
					var todos = this.model;
					for (var i = 0; i < todos.length; i++) {
						var todoModel = todos.at(i);
						this.$("#todo-table > tbody").append(
								"<tr id='todoItem" + todoModel.attributes.id
										+ "'></tr>");
						var view = new TodoView({
							el : $("#todoItem" + todoModel.attributes.id),
							model : todoModel,
							todosView : this
						});
						view.render();
					}
					return this;
				},
				createTodo : function() {
					var text = $(this.$el).find("#description").val();
					$(this.$el).find("#description").val("");
					setTimeout(function() {
			            $('#description').focus();
			        }, 50);
					var outter = this;
					this.model.create({
						description : text,
						completed: false,
						version: 1,
					}, {
						wait:true,
						success:function(resp) {
							outter.render();
						}
					});	
				},
			});

			return TodosView;
		});