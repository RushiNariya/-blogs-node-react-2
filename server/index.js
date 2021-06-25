import express from 'express';
import path from 'path';
import { graphqlHTTP } from 'express-graphql';
const cors = require('cors');
const mongoose = require('mongoose');
import resolver from './resolvers/resolver';
import schema from './schema/schema';
import imageRouter from './routes/ImageRoute';
const { ensureToken } = require('./utils/jwtUtils');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public','images')));

mongoose
  .connect(
    'mongodb+srv://rushi:12345@RpMg@cluster0.belip.mongodb.net/Blogger?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.once('open', () => {
  console.log('connected');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.get('/', (req, res) => {
  res.send('server is running.');
});

const context = async () => {
  const db = await ensureToken();

  return { db };
  
};

app.use('/image', imageRouter);

app.use(
  '/graphql',
  graphqlHTTP(async (request, response, graphQLParams) =>  ({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
    context: async () => {
      const user = await ensureToken(request);
      return user;
    }
  }))
);

app.listen(8080, () => console.log('Server is running on 8080'));
