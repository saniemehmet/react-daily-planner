import React, { Component } from 'react';
import API from '../api/API';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import * as _ from 'lodash';

class TuesdayDailyPlanner extends Component {
    state = {
    schedule: [],
    newNoteData: {
      time: '',
      note: ''
    },
    editNoteData: {
      id: '',
      time: '',
      note: ''
    },
    newNoteModal: false,
    editNoteModal: false
  }
  componentWillMount() {
    this._refreshSchedule();
  }
  toggleNewNoteModal() {
    this.setState({
      newNoteModal: ! this.state.newNoteModal
    });
  }
  toggleEditNoteModal() {
    this.setState({
      editNoteModal: ! this.state.editNoteModal
    });
  }
  addNote() {
      API.post('tuesdaySchedule',this.state.newNoteData).then((response) => {
          let schedule = this.state.schedule;
          schedule.push(response);
          this.setState({schedule,newNoteModal:false,newNoteData:{
              time:'',
              note: '',
          }})
      });
  }
  updateNote() {
    let { time,note } = this.state.editNoteData;
    API.put('tuesdaySchedule/'+this.state.editNoteData.id,{time,note}).then((response)=> {
        this._refreshSchedule();
        this.setState({
            editNoteModal: false, editNoteData: { id:'', time:'', note:''}
        })
    });
    
  }
  editNote(id, time, note) {
    this.setState({
      editNoteData: { id, time, note }, editNoteModal: ! this.state.editNoteModal
    });
  }
  deleteNote(id) {
    API.delete('tuesdaySchedule/'+id)
    .then(res => {
        this._refreshSchedule();
    })
  }
  _refreshSchedule() {
    API.get('tuesdaySchedule')
    .then(schedule => {
        this.setState({schedule:schedule});
    })
  }
  render() {
    let schedule = this.state.schedule;
    schedule=_.sortBy(schedule,o=>o.time).map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.time}</td>
          <td>{item.note}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editNote.bind(this, item.id,item.time, item.note)}>Edit</Button>
            <IconButton aria-label="delete" color="secondary" onClick={this.deleteNote.bind(this, item.id)}>
                <DeleteIcon />
                </IconButton>
          </td>
        </tr>
      )
    });
    return (
      <div className="Planner">

      <h1>Tuesday</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewNoteModal.bind(this)}>Add a note/task</Button>

      <Modal isOpen={this.state.newNoteModal} toggle={this.toggleNewNoteModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewNoteModal.bind(this)}>Add a new note</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="note">Note/Task</Label>
            <Input id="note" value={this.state.newNoteData.note} onChange={(e) => {
              let { newNoteData } = this.state;

              newNoteData.note = e.target.value;

              this.setState({ newNoteData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="time">Time</Label>
            <Input id="time" type="time" value={this.state.newNoteData.time} onChange={(e) => {
              let { newNoteData } = this.state;

              newNoteData.time = e.target.value;

              this.setState({ newNoteData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addNote.bind(this)}>Save</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewNoteModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editNoteModal} toggle={this.toggleEditNoteModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditNoteModal.bind(this)}>Edit a new product</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="note">Note/Task</Label>
            <Input id="note" value={this.state.editNoteData.note} onChange={(e) => {
              let { editNoteData } = this.state;

              editNoteData.note = e.target.value;

              this.setState({ editNoteData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="time">Time</Label>
            <Input id="time" type="time" value={this.state.editNoteData.time} onChange={(e) => {
              let { editNoteData } = this.state;

              editNoteData.time = e.target.value;

              this.setState({ editNoteData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateNote.bind(this)}>Save</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditNoteModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>Schedule</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {schedule}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TuesdayDailyPlanner;