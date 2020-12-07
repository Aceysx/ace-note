import React from "react";
import {Collapse, Icon, Input, Modal, Row, Tag} from "antd";
import PlanCreatorBox from "./plan-creator-box";

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
    isCreateTemplateModalOpen: false
  }

  changeTemplateTitle = e => {
    let {currentTemplate} = this.state
    currentTemplate.title = e.target.value
    this.setState({currentTemplate})
  }

  updateTasks = tasks => {
    let {currentTemplate} = this.state
    currentTemplate.tasks = tasks
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
                  const {index, title, cost, labelId} = task
                  const fountLabel = labels.find(item => item.id === labelId) || {}
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
        <span>Tasks:</span>
        <PlanCreatorBox
          updateTasks={this.updateTasks}
          tasks={tasks}
          labels={labels}
        />
      </Modal>
    </div>
  }
}

export default TemplateManagementBox