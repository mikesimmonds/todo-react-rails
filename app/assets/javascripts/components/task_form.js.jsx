var TaskForm = React.createClass({
  getInitialState: function(){
    return{
      title: "",
      due_date: "",
      description: "",
    }
  },

  handleChange: function(e){
    console.log(e.target.value);
    name = e.target.name;
    obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  },

  valid: function() {
    return (this.state.title && this.state.due_date && this.state.description);
  },

  handleSubmit: function(e){
    e.preventDefault();
    $.post( '/tasks/',
          {task: this.state},
          function(data){
            this.props.handleNewTask(data);
            this.setState(this.getInitialState());
          }.bind(this),
          "JSON"
    );
  },

  render : function(){
    return (
    <form className="form-inline input-form" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <input type='text' className='form-control'
               placeholder='Title' name='title'
               value={this.state.title} onChange={this.handleChange} autoFocus="autofocus">
        </input>
      </div>
      <div className='form-group'>
        <input type='text' className='form-control datepicker' data-date-format='yyyy-mm-dd' data-provide="datepicker"
          placeholder='Due Date' name='due_date'
          value={this.state.due_date} onChange={this.handleChange} onBlur={this.handleChange}>
        </input>
      </div>
      <div className='form-group'>
        <input type='text'  className='form-control'
          placeholder='Description' name='description'
          value={this.state.description} onChange={this.handleChange}>
        </input>
      </div>
      <div className='form-group'>
        <button type='submit' className='btn btn-primary'
               disabled={!this.valid()}> Submit
        </button>
      </div>
    </form>
    );
  }
})
