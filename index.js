// リゾルバの定義 ----------
const resolvers = {
    Query: {
      todoList: async (_, __, { dataSources }) =>
        dataSources.todoListAPI.getTodoList(),
    },
    Mutation: {
      createTodo: async (_, { text }, { dataSources }) => {
        return await dataSources.todoListAPI.createTodo({ text });
      },
      deleteTodo: async (_, { id }, { dataSources }) => {
        return !!(await dataSources.todoListAPI.deleteTodo({ id }));
      },
      updateTodo: async (_, { id, text }, { dataSources }) => {
        return !!(await dataSources.todoListAPI.updateTodo({ id, text }));
      },
    },
  };


// ApolloServerのインスタンス作成
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      todoListAPI: new TodoListAPI({ store }),
    }),
  });
  // サーバーを走らせる
  server.listen().then(({ url }) => {
    console.log(`立ち上がったよ！${url}`);
  });