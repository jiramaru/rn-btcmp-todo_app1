import { ConvexError, v } from "convex/values";
import { query, mutation } from "./_generated/server";

// query function to get todos
export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").order("desc").collect();
    return todos;
  },
});

// mutations Create Update and Delete

// -- add a todo
export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
    });
    return todoId;
  },
});

// -- mark as completed
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");
    await ctx.db.patch(args.id, { isCompleted: !todo.isCompleted });
  },
});

// -- delete toto
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");
    await ctx.db.delete(args.id);
  },
});

// -- update todo
export const updateTodo = mutation({
  args: { id: v.id("todos"), text: v.string() },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");
    await ctx.db.patch(args.id, { text: args.text });
  },
});

// -- delete all the todos
export const clearAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();

    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }

    return { deletedCout: todos.length };
  },
});
