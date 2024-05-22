import { createAccount, createAccountMany } from "../db/Accounts";
import { faker } from '@faker-js/faker'
import mongoose from "mongoose";


const MONGO_URL =
    "mongodb+srv://user:9xLY1kxogNt7uAq2@cluster0.ny3tbsu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));


function createPerson() {
    return {
        ccsaID: faker.phone.number(),
        stdName: faker.person.fullName(),
        course: faker.animal.cat(),
        rfidTag: faker.phone.number()
    }
}

async function runPopulate(count: number) {
    console.log("Start populating");
    let list = []
    for (let i = 0; i < count; i++) {
        list.push(createPerson());
    }
    await createAccountMany(list);
    console.log("Done populate");
}

runPopulate(100);