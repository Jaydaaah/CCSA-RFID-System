import { model, Schema, isValidObjectId } from "mongoose";

export interface Account {
    access: "Enabled" | "Disabled";
    ccsaID: string;
    stdName: string;
    course: string;
    rfidTag: string;
    imageBuffer?: Buffer;
}

const AccSchema = new Schema<Account>({
    access: { type: String, required: true },
    ccsaID: { type: String, required: true },
    stdName: { type: String, required: true },
    course: { type: String, required: true },
    rfidTag: { type: String, required: true, unique: true },
    imageBuffer: { type: Buffer, required: false, select: false },
});

const AccountModel = model("RFID-Account", AccSchema);

export async function getAccounts() {
    return await AccountModel.find().select("access ccsaID stdName course rfidTag");
}

export async function getAccountsRange(startPage: number, count: number) {
    return await AccountModel.find()
        .skip(startPage * count)
        .limit(count)
        .select("access ccsaID stdName course rfidTag");
}

export async function accountCount() {
    return await AccountModel.countDocuments();
}

export async function getAccountByID(_id: string) {
    if (isValidObjectId(_id)) return await AccountModel.findById(_id);
    else return null;
}

export async function getAccountImage(_id: string) {
    if (isValidObjectId(_id))
        return await AccountModel.findById(_id).select("imageBuffer");
    return null;
}

export function createAccount(account: Account) {
    return new AccountModel(account);
}

export async function createAccountMany(accounts: Account[]) {
    return await AccountModel.create(accounts);
}

export function deleteAccount(_id: string) {
    if (isValidObjectId(_id)) return AccountModel.findByIdAndDelete(_id);
    return null;
}

export async function updateAccount(
    _id: string,
    update: Record<string, string>
) {
    if (isValidObjectId(_id)) {
        return await AccountModel.findOneAndUpdate({ _id }, update);
    }
}

export async function getAccByRFID(rfidTag: string) {
    return await AccountModel.findOne({ rfidTag });
}
