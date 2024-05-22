export default function Home() {
    return (
        <div
        className="w-full h-[100vh]"
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
            }}
        >
            <div className="flex justify-center items-center bg-yellow-300">
                hello world
            </div>
            <div className="flex justify-center items-center bg-orange-400">
                hello world
            </div>
        </div>
    );
}
