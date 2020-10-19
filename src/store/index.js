import React, { Component } from 'react';

import * as storage from './utils/storage';
import * as update from './utils/update';
import * as search from './utils/search';

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
      form: {
        type: null,
        visible: false,
      },
    };
  }

  componentDidMount() {
    if (localStorage.length !== 0) {
      const defaults = {
        form: {
          type: null,
          visible: false,
        },
      };
      this.setState({
        ...storage.GET_ITEMS({ ...this.state }),
        ...defaults,
      });
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

  SHOW_FORM = (type, visible) => this.setState({ form: { type, visible } });

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
    });
  };

  GET_ITEM = (type, id) => search.bySelfId([...this.state[type]], id);

  RENAME_ITEM = (data) => {
    const { type, id: passedId, title } = data;
    let id;
    if (type === 'list') id = this.state.activeList;
    if (type === 'task') id = this.state.activeTask;
    if (type === 'subtask') id = passedId;

    return this.setState({
      [type]: [...update.renameItem([...this.state[type]], id, title)],
    });
  };
  DELETE_ITEM = (type, id) => {
    if (type === 'list') {
      return this.setState({
        [type]: update.removeItem([...this.state[type]], id),
        task: update.removeItemByRef([...this.state.task], id),
      });
    }
    if (type === 'task') {
      return this.setState({
        [type]: update.removeItem([...this.state[type]], id),
        subtask: update.removeItemByRef([...this.state.subtask], id),
      });
    }
    return this.setState({
      [type]: update.removeItem([...this.state[type]], id),
    });
  };

  COMPLETE_ITEM = (type, id, state) => {
    const completed = update.completeItem([...this.state[type]], id, state);
    this.setState({
      [type]: completed,
    });
  };

  GET_TASKS = (type) => {
    if (type === 'task') {
      return search
        .byRefId([...this.state[type]], this.state.activeList)
        .reverse();
    }
    if (type === 'subtask') {
      return search
        .byRefId([...this.state[type]], this.state.activeTask)
        .reverse();
    }
  };

  GET_LISTS = () => [...this.state.list].reverse();

  render() {
    return (
      <ListContext.Provider
        value={{
          ...this.state,
          CURRENTLY_ACTIVE: this.CURRENTLY_ACTIVE,
          SHOW_FORM: this.SHOW_FORM,
          ADD_ITEM: this.ADD_ITEM,
          GET_ITEM: this.GET_ITEM,
          RENAME_ITEM: this.RENAME_ITEM,
          DELETE_ITEM: this.DELETE_ITEM,
          COMPLETE_ITEM: this.COMPLETE_ITEM,
          GET_LISTS: this.GET_LISTS,
          GET_TASKS: this.GET_TASKS,
        }}
      >
        {this.props.children}
      </ListContext.Provider>
    );
  }
}

export { ListProvider, ListContext };
