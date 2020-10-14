import React, { Component } from 'react';

import * as storage from './utils/storage';
import * as update from './utils/update';

const ListContext = React.createContext();

class ListProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      task: [],
      subtask: [],
      activeList: null,
      activeTask: null,
    };
  }

  componentDidMount() {
    if (localStorage.length !== 0) {
      this.setState({ ...storage.GET_ITEMS({ ...this.state }) });
    } else {
      storage.ADD_ITEMS({ ...this.state });
    }
  }

  componentDidUpdate() {
    storage.ADD_ITEMS({ ...this.state });
  }

  // Update the list or task currently being viewed.
  CURRENTLY_ACTIVE = (type, id) => {
    switch (type) {
      case 'list':
        this.setState({ activeList: parseInt(id) });
        break;
      case 'task':
        this.setState({ activeTask: parseInt(id) });
        break;
      default:
        this.setState({
          activeList: this.state.activeList,
          activeTask: this.state.activeTask,
        });
    }
  };

  // Add a list, task or subtask.
  ADD_ITEM = (type, title) => {
    let parent_id;

    if (type === 'task' && this.state.list.length !== 0) {
      parent_id = this.state.activeList;
    }
    if (type === 'subtask' && this.state.task.length !== 0) {
      parent_id = this.state.activeTask;
    }

    return this.setState({
      [type]: [
        ...update.createItem({
          type,
          prevData: [...this.state[type]],
          title,
          parent_id,
        }),
      ],
      activeList: this.state.list.length,
      activeTask: this.state.subtask.length,
    });
  };

  GET_ITEM = (type) => {};

  render() {
    return (
      <ListContext.Provider
        value={{
          ...this.state,
          ADD_ITEM: this.ADD_ITEM,
        }}
      >
        {this.props.children}
      </ListContext.Provider>
    );
  }
}

export { ListProvider, ListContext };
