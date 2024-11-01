"use client";

import {
  Button,
  TextField,
  Container,
  Stack,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const todoSchema = z.object({
  task: z.string().min(1, { message: "заавал оруулах ёстой" }),
  description: z.string().optional(),
});

type Todo = z.infer<typeof todoSchema>;

export function PageTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Todo>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      task: "",
      description: "",
    },
  });

//   useEffect(() => {}, []);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    reset(todos[index]);
  };

  const onSubmit = (data: Todo) => {
    if (editIndex !== null) {
      const updatedTodos = todos.map((item, index) =>
        index === editIndex ? data : item
      );
      setTodos(updatedTodos);
      setEditIndex(null);
      reset();
    } else {
      setTodos((prev) => [...prev, data]);
      reset();
    }
  };

  const handleDelete = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          display="flex"
          alignItems="center"
          width="47vh"
          paddingTop={5}
          spacing={5}
        >
          <Typography variant="h5">Todo List</Typography>
          <Controller
            name="task"
            control={control}
            render={({ field,fieldState }) => (
              <TextField
                sx={{ width: "260px" }}
                label="Task"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error? fieldState.error.message : ""}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                sx={{ width: "260px" }}
                label="Description"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error? fieldState.error.message : ""}
              />
            )}
          />
          <Button
            sx={{
              border: "2px solid #608BC1",
              borderRadius: "8px",
              padding: "16px",
              backgroundColor: "#f0f0f0",
              width: "260px",
              height: "60px",
              marginLeft: "100px",
              marginTop: "20px",
            }}
            type="submit"
            color="primary"
            variant="outlined"
          >
           save
          </Button>
        </Stack>
      </form>
      <Stack
        spacing={5}
        sx={{
          border: "2px solid #608BC1",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "#f0f0f0",
          width: "47vh",
          marginLeft: "10px",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6">Todo Items</Typography>
        {todos.length > 0 ? (
          todos.map((item, index) => (
            <Typography key={index}>
              - {item.task} {item.description}
              <IconButton style={{ cursor:"pointer"}}>
              <EditIcon
                sx={{ marginLeft: "90px" }}
                onClick={() => handleEdit(index)}
                
              /></IconButton>
              <IconButton style={{ cursor: "pointer" }}>
                <DeleteIcon
                sx={{ marginLeft: "20px" }}
                onClick={() => handleDelete(index)}
                />
             </IconButton>
            </Typography>
          ))
        ) : (
          <Typography>Энэ үед ямар ч тасаг байхгүй байна.</Typography>
        )}
      </Stack>
    </Container>
  );
}
