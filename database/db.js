
import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://byadiso:Uwineza3010@cluster0.kbaby.mongodb.net/kodesha?retryWrites=true&w=majority',{ useNewUrlParser: true ,  useUnifiedTopology: true,  })
var db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', function (callback) {
    console.log('connection succeeded')
})


export default db;

