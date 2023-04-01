import { MongoClient, Db, MongoClientOptions } from 'mongodb';

export class MongoDB {
    private client!: MongoClient;
    private db!: Db;

    private uri: string;
    private db_name: string;
    private options: MongoClientOptions;

    constructor(uri: string, db_name: string, options: MongoClientOptions = {}) {
        this.uri = uri;
        this.db_name = db_name;
        this.options = options;
    }

    public async connect() {
        console.log(`🚗 Connecting to MongoDB...`);
        try {
            this.client = await MongoClient.connect(this.uri, this.options);
            this.db = this.client.db(this.db_name);
            console.log(`🚀 Connected to MongoDB ${this.db_name}`);
        } catch (error) {
            console.error(`🤕 Failed to connect MongoDb. ${error}`);
        }
    }

    public async close() {
        try {
            if (this.client) {
                await this.client.close();
                console.log(`🙋‍♂️ Disconnected from MongoDB database ${this.db_name}`);
            }
        } catch (error) {
            console.error(`Failed to disconnect from the db. ${error}`)
        }
    }

    public async find(collection_name: string, query: object) {
        return await this.db.collection(collection_name).find(query).toArray();
    }

    public async find_one(collection_name: string, query: object) {
        return await this.db.collection(collection_name).findOne(query);
    }

    public async insert(collection_name: string, document: object) {
        return await this.db.collection(collection_name).insertOne(document);
    }

    public async update(collection_name: string, query: object, update: object) {
        return await this.db.collection(collection_name).updateMany(query, update);
    }

    public async delete(collection_name: string, query: object) {
        return await this.db.collection(collection_name).deleteMany(query);
    }
}