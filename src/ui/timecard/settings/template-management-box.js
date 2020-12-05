import React from "react";
import {Collapse, Icon, Input, InputNumber, message, Modal, Row, Select, Tag} from "antd";

const InputGroup = Input.Group;
const {Option} = Select;
const {Panel} = Collapse;

const DEFAULT_TASK = (index = 0) => {
  return {index, title: '', label: '', cost: ''}
}
const DEFAULT_TEMPLATE = {
  title: '',
  tasks: [DEFAULT_TASK(0)]
}

class TemplateManagementBox extends React.Component {
  state = {
    currentTemplate: DEFAULT_TEMPLATE,
    isCreateTemplateModalOpen: true
  }

  changeTemplateTitle = e => {
    let {currentTemplate} = this.state
    currentTemplate.title = e.target.value
    this.setState({currentTemplate})
  }

  changeTaskLabel = (index, labelId) => {
    let {currentTemplate} = this.state
    let foundTask = currentTemplate.tasks.find(task => task.index === index);
    if (foundTask) {
      foundTask.label = labelId
      this.setState({currentTemplate})
      return
    }
    message.warning('can not find task with index:' + index)
  }

  changeTaskTitle = (index, newTitle) => {
    let {currentTemplate} = this.state
    let foundTask = currentTemplate.tasks.find(task => task.index === index);
    if (foundTask) {
      foundTask.title = newTitle
      this.setState({currentTemplate})
      return
    }
    message.warning('can not find task with index:' + index)
  }

  updateTaskChange = (index, cost) => {
    let {currentTemplate} = this.state
    let foundTask = currentTemplate.tasks.find(task => task.index === index);
    if (foundTask) {
      foundTask.cost = cost
      this.setState({currentTemplate})
      return
    }
    message.warning('can not find task with index:' + index)
  }

  addNewTask = () => {
    let {currentTemplate} = this.state
    currentTemplate.tasks.push(DEFAULT_TASK(currentTemplate.tasks.length))
    this.setState({currentTemplate})
  }

  removeTask = index => {
    let {currentTemplate} = this.state
    currentTemplate.tasks = currentTemplate.tasks.filter(task => task.index !== index)
    this.setState({currentTemplate})
  }

  createTemplate = () => {
    let {currentTemplate} = this.state
    this.props.createPlanTemplate(currentTemplate)
    this.setState({isCreateTemplateModalOpen: false})
  }

  render() {
    const {currentTemplate} = this.state
    const {planTemplates = [], labels} = this.props
    const {title, tasks} = currentTemplate
    return <div>
      <Collapse accordion>
        {
          planTemplates.map(template => {
            const {id, title, tasks} = template
            return <Panel header={title} key={id}>
              {
                tasks.map(task => {
                  const {index, title, cost, label} = task
                  const fountLabel = labels.find(item => item.id === label) || {}
                  return <p><Tag key={index}
                                 className='tag'
                                 color={fountLabel.color}>
                    {fountLabel.title}|{cost}
                  </Tag>
                    {title}
                  </p>
                })
              }
            </Panel>
          })
        }
      </Collapse>


      <Tag onClick={() => this.setState({isCreateTemplateModalOpen: true})}
           className='tag cursor_pointer'
           style={{background: '#fff', borderStyle: 'dashed'}}>
        <Icon type="plus"/> New Template
      </Tag>
      <Modal
        title='Create Template'
        width={'50%'}
        visible={this.state.isCreateTemplateModalOpen}
        onOk={this.createTemplate}
        onCancel={() => this.setState({isCreateTemplateModalOpen: false})}
      >
        <Row>
          <span>Template Title:</span>
          <span style={{
            display: 'inline-block',
            width: 500,
            marginLeft: 10
          }}>
            <Input value={title}
                   placeholder='template title'
                   onChange={this.changeTemplateTitle}/>
          </span>
        </Row>
        <div style={{margin: '10px 0'}}>
          <span>Tasks:</span>
          {
            tasks.map((task, i) => {
                const {index, title, label, cost} = task
                return <InputGroup compact style={{margin: '10px 0'}}>
                  <Select value={label}
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
                    i > 0
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
      </Modal>
    </div>
  }
}

export default TemplateManagementBox