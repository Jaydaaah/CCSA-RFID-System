import { Divider } from "@nextui-org/divider";

interface Props {
    rfid: React.ReactNode;
}

export default function ActiveLayout({ rfid }: Props) {
    return (
        <div
            className="w-full h-[100vh]"
            style={{
                display: "grid",
                gridTemplateColumns: "5fr 1px 3fr",
            }}
        >
            <div className="flex flex-col justify-center p-10">
                <h1 className="h-3/4 text-3xl">School Banner</h1>
            </div>
            <Divider
                className="bg-gray-200 h-[85%] self-center"
                orientation="vertical"
            />
            <div className="flex flex-col justify-center">{rfid}</div>
        </div>
    );
}
