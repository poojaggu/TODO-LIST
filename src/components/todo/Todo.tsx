import React, { Component } from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { addTodo, deleteTodo, updateTodo } from "../redux/Actions";
import { connect } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";

interface Istate {
  title?: string;
  activeId: string;
  isEditClicked: boolean;
  activeTabid: string;
}
interface Iprops {
  todoList?: [];
  addTodo?: any;
  addItem?: any;
  deleteItem: any;
  updateItem: any;
}

class Todo extends Component<Iprops, Istate> {
  state: Istate = {
    title: "",
    activeId: "",
    isEditClicked: false,
    activeTabid: "",
  };

  editItem = (id: string) => {
    this.props.todoList?.filter((each: any) => {
      if (each.id === id) {
        this.setState({
          title: each.title,
          isEditClicked: true,
          activeTabid: each.id,
        });
      }
    });
  };
  render() {
    const { title, isEditClicked, activeTabid } = this.state;
    const { todoList, deleteItem } = this.props;

    return (
      <Box className="container">
        <Grid
          container
          sx={{
            width: "30%",
          }}
        >
          {todoList?.map((item: any) => (
            <Grid
              key={item.id}
              container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                  {item.title}
                </Typography>
              </Grid>

              <Grid item>
                <Button onClick={() => deleteItem(item.id)}>
                  <DeleteIcon />
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => this.editItem(item.id)}>
                  <CreateIcon />
                </Button>
              </Grid>
            </Grid>
          ))}

          <Grid
            container
            sx={{
              bottom: 0,
              position: "absolute",
              paddingBottom: 2,
              width: "30%",
            }}
          >
            <Grid item>
              <TextField
                value={this.state.title}
                onChange={(e: { target: { value: string } }) =>
                  this.setState({ title: e.target.value })
                }
                placeholder="Enter todo"
                style={{
                  height: "37px",
                }}
                InputProps={{
                  style: {
                    color: "red",
                    height: "37px",
                  },
                }}
              />
            </Grid>
            {isEditClicked ? (
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.props.updateItem(activeTabid, title);
                    this.setState({ title: "", isEditClicked: false });
                  }}
                >
                  update
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.props.addItem(title);
                    this.setState({ title: "" });
                  }}
                >
                  add
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const mapStateToProps = (state: { todoList: [] }) => {
  return { todoList: state.todoList };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addItem: (title: string) => {
      const newtodo = {
        id: Date.now(),
        title: title,
      };
      dispatch(addTodo(newtodo));
    },
    deleteItem: (id: string) => {
      dispatch(deleteTodo(id));
    },
    updateItem: (activeTabid: string, title: string) => {
      const newData: {
        activeTabid: string;
        title: string;
      } = { activeTabid: activeTabid, title: title };
      dispatch(updateTodo(newData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
