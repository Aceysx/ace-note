import React from "react";
import {Icon, Input, InputNumber, message, Select, Tag} from "antd";

const InputGroup = Input.Group;
const {Option} = Select;

const DEFAULT_TASK = (index = 0) => {
  return {index, title: '', labelId: '', cost: ''}
}

class PlanCreatorBox extends React.Component {
  changeTaskLabel = (index, labelId) => {
    let {tasks} = this.props
    let foundTask = tasks.find(task => task.index === index);
    if (foundTask) {
      foundTask.labelId = labelId
      this.props.updateTasks(tasks)
      return
    }
    message.warning('can not find task with index:' + index)
  }

  changeTaskTitle = (index, newTitle) => {
    let {tasks} = this.props
    let foundTask = tasks.find(task => task.index === index);
    if (foundTask) {
      foundTask.title = newTitle
      this.props.updateTasks(tasks)
      return
    }
    message.warning('can not find task with index:' + index)
  }

  updateTaskChange = (index, cost) => {
    let {tasks} = this.props
    let foundTask = tasks.find(task => task.index === index);
    if (foundTask) {
      foundTask.cost = cost
      this.props.updateTasks(tasks)
      return
    }
    message.warning('can not find task with index:' + index)
  }

  addNewTask = () => {
    let {tasks} = this.props
    const nextIndex = tasks[tasks.length-1].index + 1
    tasks.push(DEFAULT_TASK(nextIndex))
    this.props.updateTasks(tasks)
  }

  removeTask = index => {
    let {tasks} = this.props
    tasks = tasks.filter(task => task.index !== index)
    this.props.updateTasks(tasks)
  }

  render() {
    const {labels = [], tasks = []} = this.props
    return <div style={{margin: '10px 0'}}>
      {
        tasks.map((task) => {
            const {index, title, labelId, cost} = task
            return <InputGroup compact style={{margin: '10px 0'}}>
              <Select value={labelId}
                      style={{width: 100}}
                      placeholder='label'
                      onSelect={labelId => this.changeTaskLabel(index, labelId)}>
                {
                  labels.map(label => {
                    const {id, title} = label
                    return <Option value={id}>
                      {title}
                    </Option>
                  })
                }
              </Select>
              <Input style={{width: 350}}
                     value={title}
                     onChange={event => this.changeTaskTitle(index, event.target.value)}
                     placeholder='task description'/>
              <InputNumber placeholder='cost point'
                           min={0}
                           onChange={cost => this.updateTaskChange(index, cost)}
                           value={cost}/>
              {
                tasks.length > 1
                  ? <Tag onClick={() => this.removeTask(index)}
                         className='tag cursor_pointer'
                         style={{background: '#fff', borderStyle: 'dashed', margin: 0}}>
                    <Icon type="delete" style={{color: '#fd4f54'}}/>
                  </Tag>
                  : ''
              }
            </InputGroup>
          }
        )
      }
      <Tag onClick={this.addNewTask}
           className='tag cursor_pointer'
           style={{background: '#fff', borderStyle: 'dashed'}}>
        <Icon type="plus"/> Add new task
      </Tag>
    </div>
  }
}

export default PlanCreatorBox