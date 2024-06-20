import { model, Schema, isValidObjectId, Types } from "mongoose";

export interface Attendance {
    acc_id: any,
    computer_name: string,
    timestamp: {
        login: number,
        logout: number
    }
    created_files: string[],
    opened_process: string[]
}

const AttendanceSchema = new Schema<Attendance>({
    acc_id: {type: String, required: true},
    computer_name: {type: String, required: true},
    timestamp: {
        login: {type: Number, required: true},
        logout: {type: Number, required: false}
    },
    created_files: {type: [String], required: true},
    opened_process: {type: [String], required: true}
})

const AttendanceModel = model("Attendance", AttendanceSchema);

export async function AttendanceLogIn(acc_id: any, computer_name: string, timestamp?: Date) {
    if (isValidObjectId(acc_id)) {
        if (!timestamp) {
            timestamp = new Date();
        }
        return await AttendanceModel.create({
            acc_id,
            computer_name,
            timestamp: {
                login: timestamp.getTime()
            },
            created_files: [],
            opened_process: []
        })
    }
    return null;
}

export async function AttendanceLogOut(attendance_id: any, timestamp?: Date) {
    if (isValidObjectId(attendance_id)) {
        if (!timestamp) {
            timestamp = new Date();
        }
        return await AttendanceModel.findByIdAndUpdate(attendance_id, {
            timestamp: {
                logout: timestamp.getTime()
            }
        })
    }
    return null;
}

export async function AddCreatedFiles(attendance_id: any, created_file: string) {
    if (isValidObjectId) {
        const attendance = await AttendanceModel.findById(attendance_id);
        if (attendance) {
            attendance.created_files.push(created_file);
            return await attendance.save();
        }
    }
}

export async function AddOpenedProcess(attendance_id: any, process_name: string) {
    if (isValidObjectId) {
        const attendance = await AttendanceModel.findById(attendance_id);
        if (attendance) {
            attendance.opened_process.push(process_name);
            return await attendance.save();
        }
    }
}